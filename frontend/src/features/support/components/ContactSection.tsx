import React from 'react';
import { Card, Input, Textarea, Button } from '@shared/components';
import { Mail, Phone, MapPin, Send, CheckCircle } from '@shared/icons';

interface ContactSectionProps {
  contactForm: { name: string; email: string; message: string };
  onContactFormChange: (form: { name: string; email: string; message: string }) => void;
  contactSubmitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactForm, onContactFormChange, contactSubmitted, onSubmit }) => {
  const infoItems = [
    { icon: Mail, label: 'Email', value: 'support@dreamboost.com' },
    { icon: Phone, label: 'Phone', value: '+91 9876543210' },
    { icon: MapPin, label: 'Address', value: 'DreamBoost, Bengaluru, Karnataka, India' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <h3 className="text-lg font-bold text-tb-navy mb-4">Get in Touch</h3>
          <div className="space-y-4">
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-tb-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-tb-navy">{item.label}</p>
                    <p className="text-sm text-tb-gray-600">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-bold text-tb-navy mb-4">Send us a Message</h3>
        {contactSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-tb-green mx-auto mb-3" />
            <p className="text-sm font-semibold text-tb-navy">Message Sent!</p>
            <p className="text-sm text-tb-gray-500 mt-1">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <Input label="Name" placeholder="Your name" value={contactForm.name}
              onChange={(e) => onContactFormChange({ ...contactForm, name: e.target.value })} required />
            <Input label="Email" type="email" placeholder="your@email.com" value={contactForm.email}
              onChange={(e) => onContactFormChange({ ...contactForm, email: e.target.value })} required />
            <Textarea label="Message" placeholder="How can we help you?" rows={4} value={contactForm.message}
              onChange={(e) => onContactFormChange({ ...contactForm, message: e.target.value })} required />
            <Button type="submit" fullWidth><Send className="w-4 h-4" /> Send Message</Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ContactSection;
