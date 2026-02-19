import React, { useEffect, useMemo, useState } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/biohackinghealthcoach/30min';
const discoveryEndpoint = import.meta.env.VITE_DISCOVERY_WEBHOOK_URL;

const buildCalendlyRedirectUrl = (baseUrl, name, email) => {
  try {
    const url = new URL(baseUrl);
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();

    if (trimmedName) {
      url.searchParams.set('name', trimmedName);
    }
    if (trimmedEmail) {
      url.searchParams.set('email', trimmedEmail);
    }

    return url.toString();
  } catch {
    return baseUrl;
  }
};

const businessTypeOptions = [
  'Small business / startup (1–10 people)',
  'Medium-sized business (11–50 people)',
  'Growing team (51–100+)',
  'Other (please specify)',
];

const interestsOptions = [
  'Cloud migration / moving to AWS/Azure/Google Cloud',
  'AI automation (e.g., chatbots, workflows, admin savings)',
  'Digital transformation / overall tech roadmap',
  'Fixing a stalled project or legacy systems',
  'Other technical implementation help',
];

const budgetOptions = [
  'Under £500',
  '£500–£2,000',
  '£2,000–£5,000',
  'Over £5,000',
  'Prefer not to say / Not sure yet',
];

const sourceOptions = ['LinkedIn', 'Google search', 'Referral / word of mouth', 'Other'];

const isEmail = (value) => /\S+@\S+\.\S+/.test(value);

const isExternalUrl = (value) => {
  if (!value) return false;
  return /^https?:\/\//i.test(value);
};

export default function DiscoverySurveyFab() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugLines, setDebugLines] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    businessEmail: '',
    companyName: '',
    businessType: '',
    interests: [],
    challengeOrGoal: '',
    budgetRange: '',
    foundYou: '',
  });

  const emailValid = useMemo(() => !formData.businessEmail || isEmail(formData.businessEmail), [formData.businessEmail]);

  useEffect(() => {
    const handleOpenSurvey = () => setOpen(true);
    window.addEventListener('open-discovery-survey', handleOpenSurvey);
    return () => window.removeEventListener('open-discovery-survey', handleOpenSurvey);
  }, []);

  const setField = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData((previous) => {
      const exists = previous.interests.includes(interest);
      return {
        ...previous,
        interests: exists
          ? previous.interests.filter((item) => item !== interest)
          : [...previous.interests, interest],
      };
    });
  };

  const canSubmit =
    formData.name.trim() &&
    formData.businessEmail.trim() &&
    emailValid &&
    formData.businessType &&
    formData.interests.length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setDebugLines([]);
    const traceLines = [];
    const pushTrace = (line) => {
      const timestamp = new Date().toISOString();
      const message = `[${timestamp}] ${line}`;
      traceLines.push(message);
      console.log(`[Discovery Debug] ${message}`);
    };

    if (!discoveryEndpoint) {
      setDebugLines([`[${new Date().toISOString()}] Missing VITE_DISCOVERY_WEBHOOK_URL.`]);
      toast.error('Discovery form is not configured yet. Please set VITE_DISCOVERY_WEBHOOK_URL.');
      return;
    }

    setIsSubmitting(true);
    try {
      const externalWebhook = isExternalUrl(discoveryEndpoint);
      pushTrace(`POST endpoint: ${discoveryEndpoint}`);
      pushTrace(`External endpoint: ${externalWebhook ? 'yes' : 'no'}`);
      pushTrace('Sending request in CORS mode to capture full response details.');

      let submitSucceeded = false;

      try {
        const response = await fetch(discoveryEndpoint, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const responseBody = await response.text();
        pushTrace(`HTTP ${response.status} ${response.statusText}`);
        pushTrace(`Response body: ${responseBody || '(empty)'}`);

        if (!response.ok) {
          throw new Error(`Webhook returned HTTP ${response.status}`);
        }

        submitSucceeded = true;
      } catch (corsError) {
        if (!externalWebhook) {
          throw corsError;
        }

        pushTrace(`CORS-mode request failed: ${corsError?.message || 'Unknown error'}`);
        pushTrace('Retrying with no-cors mode (expected for many Apps Script web apps).');

        await fetch(discoveryEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(formData),
        });

        pushTrace('no-cors request sent. Browser cannot read response body in this mode.');
        pushTrace('Check Apps Script Executions and Drive folder for confirmation.');
        submitSucceeded = true;
      }

      if (!submitSucceeded) {
        throw new Error('Submission did not complete');
      }

      setDebugLines([]);
      toast.success('Submitted ok. Redirecting to Calendly...');
      setOpen(false);
      window.location.href = buildCalendlyRedirectUrl(
        calendlyUrl,
        formData.name,
        formData.businessEmail,
      );
    } catch (error) {
      pushTrace(`Request failed: ${error?.name || 'Error'} - ${error?.message || 'Unknown error'}`);
      pushTrace('If this is a CORS error, check Apps Script deployment access and CORS handling.');
      setDebugLines(traceLines);
      toast.error('Unable to submit right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed right-4 bottom-6 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="rounded-full shadow-xl text-white px-5"
            style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Discovery Survey
          </Button>
        </DialogTrigger>

        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: 'var(--text-primary)' }}>Discovery Survey</DialogTitle>
            <DialogDescription style={{ color: 'var(--text-tertiary)' }}>
              Answer a few quick questions so I can suggest the most practical next steps.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Your Name *</label>
              <Input
                value={formData.name}
                onChange={(event) => setField('name', event.target.value)}
                required
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Business Email *</label>
              <Input
                type="email"
                value={formData.businessEmail}
                onChange={(event) => setField('businessEmail', event.target.value)}
                required
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              {!emailValid && (
                <p className="text-xs mt-1" style={{ color: '#ef4444' }}>Please enter a valid email address.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Company Name</label>
              <Input
                value={formData.companyName}
                onChange={(event) => setField('companyName', event.target.value)}
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Optional – helps me personalise my response</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>What best describes your business? *</label>
              <Select value={formData.businessType} onValueChange={(value) => setField('businessType', value)}>
                <SelectTrigger style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  <SelectValue placeholder="Select one option" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Which area are you most interested in right now? *
              </label>
              <p className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>Select all that apply</p>
              <div className="space-y-2">
                {interestsOptions.map((option) => (
                  <label key={option} className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={formData.interests.includes(option)}
                      onCheckedChange={() => toggleInterest(option)}
                    />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                What&apos;s your biggest current challenge or goal?
              </label>
              <Textarea
                rows={4}
                value={formData.challengeOrGoal}
                onChange={(event) => setField('challengeOrGoal', event.target.value)}
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                E.g. "We&apos;re outgrowing our old servers and need cloud help" or "Want to automate invoicing to save time" or "Looking for quick AI wins without big costs"
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Rough monthly IT/tech budget range (if comfortable sharing)
              </label>
              <Select value={formData.budgetRange} onValueChange={(value) => setField('budgetRange', value)}>
                <SelectTrigger style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>This is optional and helps me suggest realistic options</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>How did you find me?</label>
              <Select value={formData.foundYou} onValueChange={(value) => setField('foundYou', value)}>
                <SelectTrigger style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  <SelectValue placeholder="Select one option" />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Helps me understand where clients are coming from (optional)</p>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full text-white"
                style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit & Book Discovery Call'
                )}
              </Button>
            </div>

            {debugLines.length > 0 && (
              <div className="pt-2">
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Debug output</p>
                <pre
                  className="text-xs p-3 rounded-md whitespace-pre-wrap break-words max-h-48 overflow-y-auto"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                >
                  {debugLines.join('\n')}
                </pre>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>

      {debugLines.length > 0 && (
        <div
          className="mt-3 w-[360px] max-w-[calc(100vw-2rem)] p-3 rounded-lg shadow-xl"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--bg-primary) 96%, transparent)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Discovery Debug</p>
            <button
              type="button"
              className="text-xs underline"
              style={{ color: 'var(--accent-primary)' }}
              onClick={() => setDebugLines([])}
            >
              Clear
            </button>
          </div>
          <pre
            className="text-xs whitespace-pre-wrap break-words max-h-48 overflow-y-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            {debugLines.join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
}
