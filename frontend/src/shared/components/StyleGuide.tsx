import React from 'react';
import { Card, Button, Badge, Alert } from '@shared/components';

/**
 * Component Gallery / Style Guide
 * Showcases all available UI components with their variants
 */
const StyleGuide: React.FC = () => {
  return (
    <div className="space-y-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Design System</h1>
          <p className="text-lg text-secondary-600">
            A comprehensive collection of UI components built with Tailwind CSS for a modern, professional look.
          </p>
        </div>

        {/* Buttons */}
        <Card title="Buttons" subtitle="All button variants and sizes">
          <div className="space-y-6">
            {/* Variants */}
            <div>
              <h4 className="text-sm font-semibold text-secondary-700 mb-3">Variants</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="text-sm font-semibold text-secondary-700 mb-3">Sizes</h4>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h4 className="text-sm font-semibold text-secondary-700 mb-3">States</h4>
              <div className="flex flex-wrap gap-3">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges */}
        <Card title="Badges" subtitle="Indicator badges for status and tags" className="mt-6">
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </Card>

        {/* Alerts */}
        <Card title="Alerts" subtitle="Different alert types and messages" className="mt-6">
          <div className="space-y-3">
            <Alert variant="info" title="Info Message">
              This is an informational alert to provide helpful context.
            </Alert>
            <Alert variant="success" title="Success Message">
              Operation completed successfully!
            </Alert>
            <Alert variant="warning" title="Warning Message">
              Please review this important information before proceeding.
            </Alert>
            <Alert variant="danger" title="Error Message">
              An error occurred. Please try again later.
            </Alert>
          </div>
        </Card>

        {/* Colors */}
        <Card title="Color Palette" subtitle="Primary and secondary colors" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Primary */}
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((level) => (
              <div key={`primary-${level}`}>
                <div
                  className={`w-full h-20 rounded-lg mb-2 bg-primary-${level as any}`}
                  style={{
                    backgroundColor: `rgb(${
                      level === 50
                        ? '240, 249, 255'
                        : level === 100
                          ? '224, 242, 254'
                          : level === 200
                            ? '186, 230, 253'
                            : level === 300
                              ? '125, 211, 252'
                              : level === 400
                                ? '56, 189, 248'
                                : level === 500
                                  ? '14, 165, 233'
                                  : level === 600
                                    ? '2, 132, 199'
                                    : level === 700
                                      ? '3, 105, 161'
                                      : level === 800
                                        ? '7, 89, 133'
                                        : '12, 61, 102'
                    })`,
                  }}
                />
                <p className="text-xs font-medium text-secondary-600">Primary {level}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Typography */}
        <Card title="Typography" subtitle="Heading and text styles" className="mt-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <p className="text-sm text-secondary-500 mt-1">text-4xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Heading 2</h2>
              <p className="text-sm text-secondary-500 mt-1">text-3xl font-bold</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <p className="text-sm text-secondary-500 mt-1">text-2xl font-semibold</p>
            </div>
            <div>
              <p className="text-base">
                This is a regular paragraph text. It uses a 16px font size with comfortable line height for readability.
              </p>
              <p className="text-sm text-secondary-500 mt-1">text-base</p>
            </div>
          </div>
        </Card>

        {/* Spacing */}
        <Card title="Spacing Scale" subtitle="Consistent spacing system" className="mt-6">
          <div className="space-y-4">
            {['2', '4', '6', '8', '12', '16', '20', '24'].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="text-sm font-medium text-secondary-700 w-16">p-{size}</span>
                <div style={{ padding: `${parseInt(size) * 4}px` }} className="bg-primary-100 rounded">
                  <div className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {parseInt(size) * 4}px
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Shadows */}
        <Card title="Shadows" subtitle="Shadow effects for depth" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-soft">
              <p className="font-medium text-secondary-900">shadow-soft</p>
              <p className="text-xs text-secondary-500 mt-2">Subtle shadow for UI elements</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-medium">
              <p className="font-medium text-secondary-900">shadow-medium</p>
              <p className="text-xs text-secondary-500 mt-2">Medium emphasis shadow</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="font-medium text-secondary-900">shadow-lg</p>
              <p className="text-xs text-secondary-500 mt-2">Strong elevation shadow</p>
            </div>
          </div>
        </Card>

        {/* Animations */}
        <Card title="Animations" subtitle="Built-in animation effects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-lg animate-fade-in"></div>
              <p className="text-sm font-medium text-secondary-900">animate-fade-in</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-lg animate-slide-up"></div>
              <p className="text-sm font-medium text-secondary-900">animate-slide-up</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-lg animate-bounce-soft"></div>
              <p className="text-sm font-medium text-secondary-900">animate-bounce-soft</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StyleGuide;
