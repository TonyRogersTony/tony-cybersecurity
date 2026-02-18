import React, { useMemo, useState } from 'react';
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

export default function DiscoverySurveyFab() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (!discoveryEndpoint) {
      toast.error('Discovery form is not configured yet. Please set VITE_DISCOVERY_WEBHOOK_URL.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(discoveryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit discovery survey');
      }

      toast.success('Thanks — taking you to book your discovery call.');
      setOpen(false);
      window.location.href = calendlyUrl;
    } catch {
      toast.error('Unable to submit right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed left-4 bottom-6 z-50">
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
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
