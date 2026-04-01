import React from 'react'

// ── Molecules ──
import { Button } from '@/components/molecules/Button'
import { Alert } from '@/components/molecules/Alert'
import { Pill } from '@/components/molecules/Pill'
import { Tag } from '@/components/molecules/Tag'
import { ProgressBar } from '@/components/molecules/ProgressBar'
import { Toggle } from '@/components/molecules/Toggle'
import { Tabs } from '@/components/molecules/Tabs'
import { Checkbox } from '@/components/molecules/Checkbox'
import { Input } from '@/components/molecules/Input'
import { Card } from '@/components/molecules/Card'
import { ContextMenu } from '@/components/molecules/ContextMenu'
import { FormField } from '@/components/molecules/FormField'
import { Pagination } from '@/components/molecules/Pagination'
import { RadioGroup } from '@/components/molecules/Radio'
import { RadioThumbGroup } from '@/components/molecules/RadioThumb'
import { SearchBar } from '@/components/molecules/SearchBar'
import { Slider } from '@/components/molecules/Slider'
import { Toast } from '@/components/molecules/Toast'
import { Tooltip } from '@/components/molecules/Tooltip'

// ── Organisms ──
import { Accordion } from '@/components/organisms/Accordion'
import { DataTable } from '@/components/organisms/DataTable'
import { Drawer } from '@/components/organisms/Drawer'
import { Navbar } from '@/components/organisms/Navbar'
import { OffersList } from '@/components/organisms/OffersList'
import { Sidebar as SidebarOrganism } from '@/components/organisms/Sidebar'

// ── Prototypes ──
import { CarLeasingPrototype } from '../sections/prototypes/car-leasing/CarLeasingPrototype'
import { TrustiOnePagerPrototype } from '../sections/prototypes/trusti-one-pager/TrustiOnePagerPrototype'

// ── Templates ──
import { AuthLayout } from '@/components/templates/AuthLayout'
import { Carousel } from '@/components/templates/Carousel'
import { Cart } from '@/components/templates/Cart'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { FAQ } from '@/components/templates/FAQ'
import { Footer } from '@/components/templates/Footer'
import { Navigation } from '@/components/templates/Navigation'
import { VehicleDetailsCard } from '@/components/templates/VehicleDetailsCard'
import { GoogleReviews } from '@/components/templates/GoogleReviews'

export type Tier =
  | 'foundation'
  | 'atoms'
  | 'molecules'
  | 'organisms'
  | 'templates'
  | 'pages'
  | 'prototypes'

export interface ComponentEntry {
  id: string
  name: string
  tier: Tier
  description: string
  component: React.ComponentType<Record<string, unknown>>
  variants: VariantDef[]
  props?: PropDef[]
  status?: 'stable' | 'beta' | 'deprecated' | 'wip'
  sourceFile?: string
  url?: string
  notes?: { title: string; body: string }[]
}

export interface VariantDef {
  label: string
  props: Record<string, unknown>
  background?: 'white' | 'light' | 'dark'
}

export interface PropDef {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

export const registry: ComponentEntry[] = [

  // ──────────────────── MOLECULES ────────────────────

  {
    id: 'button',
    name: 'Button',
    tier: 'molecules',
    description: 'Primary interaction element. Supports four types — primary, secondary, link, icon — and four sizes with optional leading/trailing icons.',
    component: Button as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Button/index.tsx',
    variants: [
      { label: 'Primary L', props: { variant: 'primary', size: 'l', children: 'Continue' } },
      { label: 'Primary XL', props: { variant: 'primary', size: 'xl', children: 'Get a Quote' } },
      { label: 'Secondary', props: { variant: 'secondary', size: 'l', children: 'Go back' } },
      { label: 'Link', props: { variant: 'link', size: 'l', children: 'Learn more' } },
      { label: 'With Leading Icon', props: { variant: 'primary', size: 'l', children: 'Upload file', leadingIcon: 'fa-upload' } },
      { label: 'With Trailing Icon', props: { variant: 'primary', size: 'l', children: 'Next step', trailingIcon: 'fa-arrow-right' } },
      { label: 'Icon only', props: { variant: 'icon', size: 'l', leadingIcon: 'fa-plus' } },
      { label: 'Disabled', props: { variant: 'primary', size: 'l', disabled: true, children: 'Disabled' } },
      { label: 'Full Width', props: { variant: 'primary', size: 'l', fullWidth: true, children: 'Full Width' } },
    ],
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'link' | 'icon'", required: false, default: "'primary'", description: 'Visual type' },
      { name: 'size', type: "'s' | 'm' | 'l' | 'xl'", required: false, default: "'l'", description: 'Button size' },
      { name: 'leadingIcon', type: 'string', required: false, description: 'Font Awesome icon name for left side' },
      { name: 'trailingIcon', type: 'string', required: false, description: 'Font Awesome icon name for right side' },
      { name: 'fullWidth', type: 'boolean', required: false, default: 'false', description: 'Stretch to container width' },
      { name: 'loading', type: 'boolean', required: false, default: 'false', description: 'Shows loading spinner' },
      { name: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Disables interaction' },
    ],
  },

  {
    id: 'alert',
    name: 'Alert',
    tier: 'molecules',
    description: 'Collapsible notification banner. Single-item accordion — collapsed shows title, expanded shows description and action buttons.',
    component: Alert as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Alert/index.tsx',
    variants: [
      { label: 'Warning', props: { variant: 'warning', title: 'Missing information', description: 'Please complete all required fields before continuing.', defaultExpanded: true } },
      { label: 'Error', props: { variant: 'error', title: 'Payment failed', description: 'Your card was declined. Please check your payment details.' } },
      { label: 'Info', props: { variant: 'info', title: 'New policy available', description: 'A new comprehensive plan is now available for your vehicle.' } },
      { label: 'Success', props: { variant: 'success', title: 'Policy activated', description: 'Your insurance policy is now active and ready to use.' } },
    ],
    props: [
      { name: 'variant', type: "'warning' | 'error' | 'info' | 'success'", required: false, default: "'warning'", description: 'Alert type' },
      { name: 'title', type: 'string', required: true, description: 'Alert headline' },
      { name: 'description', type: 'string', required: false, description: 'Expanded body text' },
      { name: 'defaultExpanded', type: 'boolean', required: false, default: 'false', description: 'Whether expanded by default' },
      { name: 'primaryAction', type: 'AlertAction', required: false, description: 'Primary CTA in expanded state' },
      { name: 'secondaryAction', type: 'AlertAction', required: false, description: 'Secondary CTA in expanded state' },
    ],
  },

  {
    id: 'pill',
    name: 'Pill',
    tier: 'molecules',
    description: 'Compact label / filter chip. Five variants, four sizes, optional leading/trailing icons.',
    component: Pill as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Pill/index.tsx',
    variants: [
      { label: 'Default', props: { children: 'All types' } },
      { label: 'Accent', props: { variant: 'accent', children: 'Car insurance' } },
      { label: 'Success', props: { variant: 'success', children: 'Active' } },
      { label: 'Warning', props: { variant: 'warning', children: 'Pending' } },
      { label: 'Destructive', props: { variant: 'destructive', children: 'Expired' } },
      { label: 'Selected', props: { variant: 'accent', selected: true, children: 'Selected' } },
      { label: 'With Icon', props: { variant: 'accent', leftIcon: 'fa-car', children: 'Vehicle' } },
      { label: 'XS', props: { size: 'xs', children: 'Extra small' } },
      { label: 'Large', props: { size: 'l', children: 'Large pill' } },
    ],
    props: [
      { name: 'variant', type: "'default' | 'accent' | 'success' | 'warning' | 'destructive'", required: false, default: "'default'", description: 'Color variant' },
      { name: 'size', type: "'xs' | 's' | 'm' | 'l'", required: false, default: "'m'", description: 'Pill size' },
      { name: 'selected', type: 'boolean', required: false, default: 'false', description: 'Selected/active state with stronger border' },
      { name: 'leftIcon', type: 'string', required: false, description: 'Font Awesome icon name' },
      { name: 'rightIcon', type: 'string', required: false, description: 'Font Awesome icon name' },
      { name: 'onClick', type: '() => void', required: false, description: 'Click handler — makes it interactive' },
    ],
  },

  {
    id: 'tag',
    name: 'Tag',
    tier: 'molecules',
    description: 'Compact removable label. Optional left icon and always-visible remove button.',
    component: Tag as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Tag/index.tsx',
    variants: [
      { label: 'Default M', props: { children: 'Liability' } },
      { label: 'With Icon', props: { leftIcon: 'fa-car', children: 'Vehicle' } },
      { label: 'Small', props: { size: 's', children: 'Small tag' } },
      { label: 'XS', props: { size: 'xs', children: 'Micro' } },
      { label: 'Large', props: { size: 'l', children: 'Large tag' } },
    ],
    props: [
      { name: 'size', type: "'xs' | 's' | 'm' | 'l'", required: false, default: "'m'", description: 'Tag size' },
      { name: 'leftIcon', type: 'string', required: false, description: 'Font Awesome icon name for leading icon' },
      { name: 'onRemove', type: '() => void', required: false, description: 'Fires when remove button is clicked' },
    ],
  },

  {
    id: 'progress-bar',
    name: 'Progress Bar',
    tier: 'molecules',
    description: 'Step progress indicator for multi-step flows. Shows step count label, back button, and animated fill track.',
    component: ProgressBar as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/ProgressBar/index.tsx',
    variants: [
      { label: 'Step 1 of 4', props: { currentStep: 1, totalSteps: 4, stepLabel: 'Personal details', showBack: false } },
      { label: 'Step 2 of 4', props: { currentStep: 2, totalSteps: 4, stepLabel: 'Vehicle info', showBack: true } },
      { label: 'Step 3 of 4', props: { currentStep: 3, totalSteps: 4, stepLabel: 'Coverage options', showBack: true } },
      { label: 'Complete', props: { currentStep: 4, totalSteps: 4, stepLabel: 'Review & submit', showBack: true } },
    ],
    props: [
      { name: 'currentStep', type: 'number', required: true, description: 'Current step (1-based)' },
      { name: 'totalSteps', type: 'number', required: true, description: 'Total number of steps' },
      { name: 'stepLabel', type: 'string', required: false, description: 'Label for current step' },
      { name: 'showBack', type: 'boolean', required: false, default: 'true', description: 'Whether to show back button' },
      { name: 'backLabel', type: 'string', required: false, default: "'Назад'", description: 'Back button text' },
      { name: 'onBack', type: '() => void', required: false, description: 'Back button click handler' },
    ],
  },

  {
    id: 'toggle',
    name: 'Toggle',
    tier: 'molecules',
    description: 'Full-featured toggle with label and accessible description. Molecule version of the Toggle atom.',
    component: Toggle as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Toggle/index.tsx',
    variants: [
      { label: 'Off', props: { checked: false, label: 'Email notifications' } },
      { label: 'On', props: { checked: true, label: 'Email notifications' } },
      { label: 'Disabled off', props: { checked: false, disabled: true, label: 'SMS alerts' } },
      { label: 'Disabled on', props: { checked: true, disabled: true, label: 'SMS alerts' } },
    ],
    props: [
      { name: 'checked', type: 'boolean', required: false, default: 'false', description: 'Toggle state' },
      { name: 'onChange', type: '(checked: boolean) => void', required: false, description: 'Change handler' },
      { name: 'label', type: 'string', required: false, description: 'Label text' },
      { name: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Disables interaction' },
    ],
  },

  {
    id: 'tabs',
    name: 'Tabs',
    tier: 'molecules',
    description: 'Pill-style tab bar. Animated sliding indicator highlights active tab.',
    component: Tabs as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Tabs/index.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          items: [
            { value: 'overview', label: 'Overview' },
            { value: 'details', label: 'Details' },
            { value: 'claims', label: 'Claims' },
          ],
          defaultValue: 'overview',
        },
      },
      {
        label: 'Four tabs',
        props: {
          items: [
            { value: 'all', label: 'All' },
            { value: 'car', label: 'Car' },
            { value: 'health', label: 'Health' },
            { value: 'home', label: 'Home' },
          ],
          defaultValue: 'all',
        },
      },
    ],
    props: [
      { name: 'items', type: 'TabItem[]', required: true, description: 'Array of { value, label, disabled? } objects' },
      { name: 'value', type: 'string', required: false, description: 'Controlled active tab value' },
      { name: 'defaultValue', type: 'string', required: false, description: 'Initially selected tab value' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Fires when active tab changes' },
    ],
  },

  {
    id: 'checkbox',
    name: 'Checkbox',
    tier: 'molecules',
    description: 'Checkbox input with optional label and error/warning states.',
    component: Checkbox as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Checkbox/index.tsx',
    variants: [
      { label: 'Unchecked', props: { label: 'I agree to the terms' } },
      { label: 'Checked', props: { checked: true, label: 'I agree to the terms' } },
      { label: 'Disabled', props: { disabled: true, label: 'Not available' } },
      { label: 'Error state', props: { label: 'Accept policy', error: true, message: 'This field is required' } },
    ],
    props: [
      { name: 'checked', type: 'boolean', required: false, default: 'false', description: 'Checked state' },
      { name: 'onChange', type: '(checked: boolean) => void', required: false, description: 'Change handler' },
      { name: 'label', type: 'string', required: false, description: 'Label text beside checkbox' },
      { name: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Disables interaction' },
      { name: 'error', type: 'boolean', required: false, description: 'Error visual state' },
      { name: 'message', type: 'string', required: false, description: 'Helper/error message below checkbox' },
    ],
  },

  {
    id: 'input',
    name: 'Input',
    tier: 'molecules',
    description: 'Versatile form input. Six types: text, textarea, dropdown, plate (number plate), phone, datepicker.',
    component: Input as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Input/index.tsx',
    variants: [
      { label: 'Text', props: { inputType: 'text', label: 'First name', placeholder: 'Enter your name' } },
      { label: 'Textarea', props: { inputType: 'textarea', label: 'Notes', placeholder: 'Add any notes...' } },
      { label: 'Dropdown', props: { inputType: 'dropdown', label: 'Insurance type', options: [{ value: 'mtpl', label: 'MTPL' }, { value: 'casco', label: 'Casco' }, { value: 'travel', label: 'Travel' }] } },
      { label: 'Plate', props: { inputType: 'plate', label: 'Number plate', placeholder: 'CB 1234 AB' } },
      { label: 'Phone', props: { inputType: 'phone', label: 'Phone number', placeholder: '888 123 456', countryCode: '+359', countryFlag: '🇧🇬' } },
      { label: 'Error state', props: { inputType: 'text', label: 'Email', placeholder: 'you@example.com', error: 'Invalid email address' } },
      { label: 'Disabled', props: { inputType: 'text', label: 'Username', placeholder: 'Disabled', disabled: true } },
    ],
    props: [
      { name: 'inputType', type: "'text' | 'textarea' | 'dropdown' | 'plate' | 'phone' | 'datepicker'", required: false, default: "'text'", description: 'Field type' },
      { name: 'label', type: 'string', required: false, description: 'Floating label' },
      { name: 'error', type: 'string', required: false, description: 'Error message (triggers error state)' },
      { name: 'options', type: 'InputOption[]', required: false, description: 'Options for dropdown type' },
      { name: 'countryCode', type: 'string', required: false, description: 'Phone prefix (e.g. +359)' },
      { name: 'countryFlag', type: 'string', required: false, description: 'Flag emoji for phone type' },
    ],
  },

  {
    id: 'card',
    name: 'Card',
    tier: 'molecules',
    description: 'Surface container with optional header, footer, and three visual styles.',
    component: Card as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Card.tsx',
    variants: [
      { label: 'Default', props: { children: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14 } }, 'Default card content goes here.') } },
      { label: 'Outlined', props: { variant: 'outlined', children: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14 } }, 'Outlined card with visible border.') } },
      { label: 'Elevated', props: { variant: 'elevated', children: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14 } }, 'Elevated card with shadow.') } },
      { label: 'With Header', props: { header: React.createElement('strong', null, 'Card Title'), children: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14 } }, 'Card body text.') } },
      { label: 'With Footer', props: { children: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14 } }, 'Card body.'), footer: React.createElement('span', { style: { fontSize: 12, color: 'var(--primary-500)' } }, 'Footer note') } },
    ],
    props: [
      { name: 'variant', type: "'default' | 'outlined' | 'elevated'", required: false, default: "'default'", description: 'Visual style' },
      { name: 'padding', type: "'sm' | 'md' | 'lg'", required: false, default: "'md'", description: 'Internal padding' },
      { name: 'header', type: 'React.ReactNode', required: false, description: 'Card header content' },
      { name: 'footer', type: 'React.ReactNode', required: false, description: 'Card footer content' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Card body content' },
    ],
  },

  {
    id: 'context-menu',
    name: 'Context Menu',
    tier: 'molecules',
    description: 'Floating action menu with icon items, dividers, and destructive states.',
    component: ContextMenu as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/ContextMenu/index.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          open: true,
          onClose: () => {},
          items: [
            { id: 'edit', label: 'Edit', leftIcon: 'fa-pen' },
            { id: 'duplicate', label: 'Duplicate', leftIcon: 'fa-copy', dividerAfter: true },
            { id: 'delete', label: 'Delete', leftIcon: 'fa-trash', destructive: true },
          ],
        },
      },
      {
        label: 'With Additional Text',
        props: {
          open: true,
          onClose: () => {},
          items: [
            { id: 'save', label: 'Save', leftIcon: 'fa-floppy-disk', additionalText: '⌘S' },
            { id: 'save-as', label: 'Save as…', leftIcon: 'fa-floppy-disk', additionalText: '⌘⇧S' },
            { id: 'share', label: 'Share', leftIcon: 'fa-share-nodes', dividerAfter: true },
            { id: 'delete', label: 'Delete', leftIcon: 'fa-trash', destructive: true, disabled: false },
            { id: 'archive', label: 'Archive', leftIcon: 'fa-box-archive', disabled: true },
          ],
        },
      },
    ],
    props: [
      { name: 'items', type: 'ContextMenuItem[]', required: true, description: 'Array of menu items' },
      { name: 'open', type: 'boolean', required: true, description: 'Controls visibility' },
      { name: 'onClose', type: '() => void', required: true, description: 'Called on outside click or Escape' },
      { name: 'onSelect', type: '(id: string) => void', required: false, description: 'Called when an item is clicked' },
    ],
  },

  {
    id: 'form-field',
    name: 'Form Field',
    tier: 'molecules',
    description: 'Label + input wrapper with helper text and error state.',
    component: FormField as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/FormField.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          label: 'Email address',
          children: React.createElement(Input as React.ComponentType<Record<string, unknown>>, { inputType: 'text', placeholder: 'you@example.com' }),
        },
      },
      {
        label: 'Required',
        props: {
          label: 'Full name',
          required: true,
          children: React.createElement(Input as React.ComponentType<Record<string, unknown>>, { inputType: 'text', placeholder: 'John Doe' }),
        },
      },
      {
        label: 'With Helper Text',
        props: {
          label: 'Password',
          helperText: 'Must be at least 8 characters',
          children: React.createElement(Input as React.ComponentType<Record<string, unknown>>, { inputType: 'text', placeholder: '••••••••' }),
        },
      },
      {
        label: 'Error State',
        props: {
          label: 'Email',
          error: 'Please enter a valid email address',
          children: React.createElement(Input as React.ComponentType<Record<string, unknown>>, { inputType: 'text', placeholder: 'you@example.com', error: 'Please enter a valid email address' }),
        },
      },
    ],
    props: [
      { name: 'label', type: 'string', required: true, description: 'Field label' },
      { name: 'required', type: 'boolean', required: false, default: 'false', description: 'Appends required asterisk' },
      { name: 'error', type: 'string', required: false, description: 'Error message — shown in red below field' },
      { name: 'helperText', type: 'string', required: false, description: 'Helper text shown when no error' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'The form control (Input, Select, etc.)' },
    ],
  },

  {
    id: 'pagination',
    name: 'Pagination',
    tier: 'molecules',
    description: 'Page navigation control with prev/next and numbered page buttons.',
    component: Pagination as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Pagination/index.tsx',
    variants: [
      { label: 'Page 1 of 10', props: { currentPage: 1, totalPages: 10, onPageChange: () => {} } },
      { label: 'Page 5 of 10', props: { currentPage: 5, totalPages: 10, onPageChange: () => {} } },
      { label: 'Page 10 of 10', props: { currentPage: 10, totalPages: 10, onPageChange: () => {} } },
      { label: 'Few pages', props: { currentPage: 2, totalPages: 4, onPageChange: () => {} } },
    ],
    props: [
      { name: 'currentPage', type: 'number', required: true, description: 'Active page number (1-based)' },
      { name: 'totalPages', type: 'number', required: true, description: 'Total number of pages' },
      { name: 'onPageChange', type: '(page: number) => void', required: true, description: 'Called when page changes' },
    ],
  },

  {
    id: 'radio',
    name: 'Radio',
    tier: 'molecules',
    description: 'Radio button group with legend and disabled states.',
    component: RadioGroup as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Radio/index.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          name: 'insurance-type',
          legend: 'Insurance type',
          options: [
            { value: 'mtpl', label: 'MTPL (Third-party liability)' },
            { value: 'casco', label: 'Casco (Comprehensive)' },
            { value: 'travel', label: 'Travel insurance' },
          ],
          value: 'mtpl',
        },
      },
      {
        label: 'With Disabled Option',
        props: {
          name: 'plan',
          options: [
            { value: 'basic', label: 'Basic plan' },
            { value: 'standard', label: 'Standard plan' },
            { value: 'premium', label: 'Premium plan (unavailable)', disabled: true },
          ],
          value: 'basic',
        },
      },
    ],
    props: [
      { name: 'name', type: 'string', required: true, description: 'HTML radio group name' },
      { name: 'options', type: 'RadioOption[]', required: true, description: 'Array of { value, label, disabled? }' },
      { name: 'legend', type: 'string', required: false, description: 'Group label' },
      { name: 'value', type: 'string', required: false, description: 'Selected value' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Change handler' },
    ],
  },

  {
    id: 'radio-thumb',
    name: 'Radio Thumb',
    tier: 'molecules',
    description: 'Thumbnail-style radio selection cards. Icon or Logo types.',
    component: RadioThumbGroup as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/RadioThumb/index.tsx',
    variants: [
      {
        label: 'Icon type',
        props: {
          name: 'vehicle-type',
          type: 'icon',
          value: 'car',
          options: [
            { value: 'car', label: 'Car', icon: 'fa-car' },
            { value: 'motorcycle', label: 'Motorcycle', icon: 'fa-motorcycle' },
            { value: 'truck', label: 'Truck', icon: 'fa-truck' },
          ],
        },
      },
      {
        label: 'With Disclaimer',
        props: {
          name: 'insurance',
          type: 'icon',
          value: 'home',
          options: [
            { value: 'home', label: 'Home', icon: 'fa-house', disclaimer: 'Most popular' },
            { value: 'health', label: 'Health', icon: 'fa-heart-pulse', disclaimer: 'Coming soon' },
          ],
        },
      },
    ],
    props: [
      { name: 'name', type: 'string', required: true, description: 'HTML radio group name' },
      { name: 'type', type: "'icon' | 'logo'", required: false, default: "'icon'", description: 'Visual type of thumb card' },
      { name: 'options', type: 'RadioThumbOption[]', required: true, description: 'Array of { value, label, icon?, logo?, disclaimer?, disabled? }' },
      { name: 'value', type: 'string', required: false, description: 'Selected value' },
      { name: 'onChange', type: '(value: string) => void', required: false, description: 'Change handler' },
    ],
  },

  {
    id: 'search-bar',
    name: 'Search Bar',
    tier: 'molecules',
    description: 'Text input with search icon and clear button.',
    component: SearchBar as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/SearchBar.tsx',
    variants: [
      { label: 'Empty', props: { value: '', onChange: () => {}, placeholder: 'Search policies...' } },
      { label: 'With Value', props: { value: 'casco insurance', onChange: () => {}, placeholder: 'Search policies...' } },
    ],
    props: [
      { name: 'value', type: 'string', required: true, description: 'Input value' },
      { name: 'onChange', type: '(value: string) => void', required: true, description: 'Change handler' },
      { name: 'placeholder', type: 'string', required: false, default: "'Search components...'", description: 'Placeholder text' },
    ],
  },

  {
    id: 'slider',
    name: 'Slider',
    tier: 'molecules',
    description: 'Range slider with accent-colored fill track and value display.',
    component: Slider as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Slider/index.tsx',
    variants: [
      { label: 'Default', props: { value: 40, onChange: () => {}, label: 'Coverage amount', min: 0, max: 100 } },
      { label: 'Custom Range', props: { value: 5000, onChange: () => {}, label: 'Deductible', min: 0, max: 10000, step: 500, formatValue: (v: number) => `${v} лв` } },
      { label: 'Disabled', props: { value: 30, onChange: () => {}, label: 'Disabled slider', disabled: true } },
    ],
    props: [
      { name: 'value', type: 'number', required: true, description: 'Current value' },
      { name: 'onChange', type: '(value: number) => void', required: true, description: 'Change handler' },
      { name: 'min', type: 'number', required: false, default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number', required: false, default: '100', description: 'Maximum value' },
      { name: 'step', type: 'number', required: false, default: '1', description: 'Step increment' },
      { name: 'label', type: 'string', required: false, description: 'Label above the slider' },
      { name: 'showValue', type: 'boolean', required: false, default: 'true', description: 'Display current value' },
      { name: 'formatValue', type: '(value: number) => string', required: false, description: 'Custom value formatter' },
      { name: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Disables interaction' },
    ],
  },

  {
    id: 'toast',
    name: 'Toast',
    tier: 'molecules',
    description: 'Temporary notification snackbar. Four variants with auto-dismiss timer.',
    component: Toast as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Toast/index.tsx',
    variants: [
      { label: 'Info', props: { variant: 'info', message: 'Your document is being processed.', onDismiss: () => {}, duration: 0 } },
      { label: 'Success', props: { variant: 'success', message: 'Policy activated successfully!', onDismiss: () => {}, duration: 0 } },
      { label: 'Warning', props: { variant: 'warning', message: 'Your session will expire in 5 minutes.', onDismiss: () => {}, duration: 0 } },
      { label: 'Destructive', props: { variant: 'destructive', message: 'Payment failed. Please try again.', onDismiss: () => {}, duration: 0 } },
      { label: 'With Action', props: { variant: 'info', message: 'New update available.', action: { label: 'Refresh', onClick: () => {} }, onDismiss: () => {}, duration: 0 } },
    ],
    props: [
      { name: 'message', type: 'string', required: true, description: 'Toast text' },
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'destructive'", required: false, default: "'info'", description: 'Color variant' },
      { name: 'duration', type: 'number', required: false, default: '5000', description: 'Auto-dismiss ms (0 = persistent)' },
      { name: 'action', type: 'ToastAction', required: false, description: 'Optional action button' },
      { name: 'onDismiss', type: '() => void', required: true, description: 'Called when dismissed' },
    ],
  },

  {
    id: 'tooltip',
    name: 'Tooltip',
    tier: 'molecules',
    description: 'Contextual help overlay on hover/focus. Info and error types, four positions.',
    component: Tooltip as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/molecules/Tooltip/index.tsx',
    variants: [
      {
        label: 'Info (top)',
        props: {
          content: 'This is a helpful tooltip',
          type: 'info',
          position: 'top',
          children: React.createElement('button', { style: { padding: '8px 16px', background: 'var(--primary-100)', border: '1px solid var(--primary-300)', borderRadius: 6, cursor: 'pointer' } }, 'Hover me'),
        },
      },
      {
        label: 'Error',
        props: {
          content: 'This field is required',
          type: 'error',
          position: 'top',
          children: React.createElement('button', { style: { padding: '8px 16px', background: 'var(--destructive-100)', border: '1px solid var(--destructive-300)', borderRadius: 6, cursor: 'pointer' } }, 'Error tooltip'),
        },
      },
      {
        label: 'Bottom',
        props: {
          content: 'Tooltip below the element',
          position: 'bottom',
          children: React.createElement('button', { style: { padding: '8px 16px', background: 'var(--primary-100)', border: '1px solid var(--primary-300)', borderRadius: 6, cursor: 'pointer' } }, 'Hover for bottom'),
        },
      },
    ],
    props: [
      { name: 'content', type: 'string', required: true, description: 'Tooltip text' },
      { name: 'type', type: "'info' | 'error'", required: false, default: "'info'", description: 'Visual variant' },
      { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", required: false, default: "'top'", description: 'Tooltip placement' },
      { name: 'children', type: 'React.ReactElement', required: true, description: 'Trigger element' },
    ],
  },

  // ──────────────────── ORGANISMS ────────────────────

  {
    id: 'accordion',
    name: 'Accordion',
    tier: 'organisms',
    description: 'Collapsible content list with animated height transitions. Accent-colored indicator when expanded.',
    component: Accordion as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/organisms/Accordion/index.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          items: [
            { id: '1', title: 'What does the policy cover?', content: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14, lineHeight: 1.6 } }, 'The policy covers third-party liability, own damage, theft, and natural disasters.') },
            { id: '2', title: 'How do I file a claim?', content: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14, lineHeight: 1.6 } }, 'You can file a claim online via the Trusti app or by calling our 24/7 support line.') },
            { id: '3', title: 'What is the deductible?', content: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14, lineHeight: 1.6 } }, 'The standard deductible is 300 BGN. Premium plans have no deductible.') },
          ],
          defaultOpenIds: ['1'],
        },
      },
    ],
    props: [
      { name: 'items', type: 'AccordionItem[]', required: true, description: 'Array of { id, title, content, disabled? }' },
      { name: 'allowMultiple', type: 'boolean', required: false, default: 'false', description: 'Allow multiple panels open simultaneously' },
      { name: 'defaultOpenIds', type: 'string[]', required: false, description: 'IDs of initially expanded panels' },
    ],
  },

  {
    id: 'data-table',
    name: 'Data Table',
    tier: 'organisms',
    description: 'Sortable data grid with striped rows and column sort indicators.',
    component: DataTable as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/organisms/DataTable.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          columns: [
            { key: 'policy', label: 'Policy' },
            { key: 'type', label: 'Type' },
            { key: 'status', label: 'Status' },
            { key: 'premium', label: 'Premium' },
          ],
          rows: [
            { policy: 'POL-001', type: 'MTPL', status: 'Active', premium: '240 лв' },
            { policy: 'POL-002', type: 'Casco', status: 'Active', premium: '860 лв' },
            { policy: 'POL-003', type: 'Travel', status: 'Expired', premium: '45 лв' },
          ],
        },
      },
      {
        label: 'Sortable',
        props: {
          sortable: true,
          columns: [
            { key: 'name', label: 'Name', width: '40%' },
            { key: 'date', label: 'Date' },
            { key: 'amount', label: 'Amount' },
          ],
          rows: [
            { name: 'Vehicle insurance', date: '2024-01-15', amount: '240 лв' },
            { name: 'Home insurance', date: '2024-03-20', amount: '180 лв' },
            { name: 'Travel policy', date: '2024-02-10', amount: '45 лв' },
          ],
        },
      },
    ],
    props: [
      { name: 'columns', type: 'DataTableColumn[]', required: true, description: 'Array of { key, label, width? }' },
      { name: 'rows', type: "Record<string, React.ReactNode>[]", required: true, description: 'Row data keyed by column key' },
      { name: 'sortable', type: 'boolean', required: false, default: 'false', description: 'Enable column sorting' },
      { name: 'onSort', type: '(key: string, direction: SortDirection) => void', required: false, description: 'Sort change callback' },
    ],
  },

  {
    id: 'drawer',
    name: 'Drawer',
    tier: 'organisms',
    description: 'Slide-in panel. Info type (right-slide) or action type (bottom on mobile, right on desktop).',
    component: Drawer as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/organisms/Drawer/index.tsx',
    variants: [
      {
        label: 'Info',
        props: {
          open: true,
          onClose: () => {},
          type: 'info',
          title: 'Policy details',
          children: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14, lineHeight: 1.6 } }, 'Your MTPL policy is active until December 31, 2025. Coverage includes third-party liability up to 1,000,000 BGN.'),
        },
      },
      {
        label: 'Action with Footer',
        props: {
          open: true,
          onClose: () => {},
          type: 'action',
          title: 'Add vehicle',
          children: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14, lineHeight: 1.6 } }, 'Enter your vehicle details to add it to your policy.'),
          footer: React.createElement('button', { style: { padding: '10px 24px', background: 'var(--accent-600)', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 } }, 'Continue'),
        },
      },
    ],
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controls visibility' },
      { name: 'onClose', type: '() => void', required: true, description: 'Called on overlay click or Escape' },
      { name: 'type', type: "'info' | 'action'", required: false, default: "'info'", description: 'Drawer type (affects mobile behavior)' },
      { name: 'title', type: 'string', required: false, description: 'Drawer heading' },
      { name: 'notch', type: 'boolean', required: false, default: 'false', description: 'Show drag handle (mobile action)' },
      { name: 'footer', type: 'React.ReactNode', required: false, description: 'Footer content' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Drawer body content' },
    ],
  },

  {
    id: 'navbar',
    name: 'Navbar',
    tier: 'organisms',
    description: 'Sticky top navigation bar with title and optional theme toggle.',
    component: Navbar as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/organisms/Navbar.tsx',
    variants: [
      { label: 'Default', props: { title: 'Trusti Dashboard' } },
      { label: 'With Theme Toggle', props: { title: 'Trusti Dashboard', onThemeToggle: () => {}, isDark: false } },
    ],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Navbar title text' },
      { name: 'onThemeToggle', type: '() => void', required: false, description: 'Theme toggle handler' },
      { name: 'isDark', type: 'boolean', required: false, default: 'false', description: 'Current dark mode state' },
    ],
  },

  {
    id: 'offers-list',
    name: 'Offers List',
    tier: 'organisms',
    description: 'Horizontal offer cards for insurance, quick loans, fines, and car leasing products.',
    component: OffersList as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/organisms/OffersList/index.tsx',
    variants: [
      {
        label: 'Insurance (MTPL)',
        props: {
          offers: [
            { id: '1', type: 'mtpl', companyName: 'Bulstrad', recommended: true, installmentPrice: { amount: 95.50, euroEquivalent: 48.83 }, totalPrice: { amount: 240.00, euroEquivalent: 122.75 } },
            { id: '2', type: 'mtpl', companyName: 'DZI', installmentPrice: { amount: 102.00, euroEquivalent: 52.15 }, totalPrice: { amount: 265.00, euroEquivalent: 135.50 } },
            { id: '3', type: 'mtpl', companyName: 'Generali', installmentPrice: { amount: 88.00, euroEquivalent: 45.00 }, totalPrice: { amount: 220.00, euroEquivalent: 112.50 } },
          ],
        },
      },
      {
        label: 'Loading skeleton',
        props: { offers: [], loading: true },
      },
    ],
    props: [
      { name: 'offers', type: 'Offer[]', required: true, description: 'Array of offer objects (insurance, quickLoans, fines, carLeasing)' },
      { name: 'loading', type: 'boolean', required: false, default: 'false', description: 'Show skeleton loading state' },
      { name: 'onSelect', type: '(offerId: string) => void', required: false, description: 'Called when an offer is selected' },
      { name: 'onToggle', type: '(offerId: string, selected: boolean) => void', required: false, description: 'Called when a checkbox offer is toggled' },
    ],
  },

  {
    id: 'sidebar-organism',
    name: 'Sidebar',
    tier: 'organisms',
    description: 'Navigation sidebar with sections, active item highlighting, and link callbacks.',
    component: SidebarOrganism as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/organisms/Sidebar.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          activeId: 'policies',
          sections: [
            {
              title: 'Overview',
              items: [
                { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
                { id: 'policies', label: 'My Policies', href: '/policies' },
                { id: 'claims', label: 'Claims', href: '/claims' },
              ],
            },
            {
              title: 'Account',
              items: [
                { id: 'profile', label: 'Profile', href: '/profile' },
                { id: 'billing', label: 'Billing', href: '/billing' },
              ],
            },
          ],
        },
      },
    ],
    props: [
      { name: 'sections', type: 'SidebarSection[]', required: true, description: 'Array of { title, items: { id, label, href }[] }' },
      { name: 'activeId', type: 'string', required: false, description: 'ID of the currently active item' },
      { name: 'onNavigate', type: '(id: string, href: string) => void', required: false, description: 'Navigation callback (prevents default)' },
    ],
  },

  // ──────────────────── TEMPLATES ────────────────────

  {
    id: 'auth-layout',
    name: 'Auth Layout',
    tier: 'templates',
    description: 'Centered card layout for authentication pages (login, register, forgot password).',
    component: AuthLayout as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/templates/AuthLayout.tsx',
    variants: [
      {
        label: 'Login',
        props: {
          title: 'Sign in to Trusti',
          subtitle: 'Welcome back! Enter your details to continue.',
          children: React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
            React.createElement(Input as React.ComponentType<Record<string, unknown>>, { inputType: 'text', label: 'Email', placeholder: 'you@example.com' }),
            React.createElement(Input as React.ComponentType<Record<string, unknown>>, { inputType: 'text', label: 'Password', placeholder: '••••••••' }),
          ),
        },
      },
    ],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Page heading' },
      { name: 'subtitle', type: 'string', required: false, description: 'Subtitle below heading' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Form content' },
    ],
  },

  {
    id: 'carousel',
    name: 'Carousel',
    tier: 'templates',
    description: 'Slide carousel with prev/next arrows, dot indicators, and optional auto-play.',
    component: Carousel as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/templates/Carousel/index.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          slides: [
            { id: '1', content: React.createElement('div', { style: { height: 200, background: 'var(--accent-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600, color: 'var(--accent-700)' } }, 'Slide 1 — Car Insurance') },
            { id: '2', content: React.createElement('div', { style: { height: 200, background: 'var(--success-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600, color: 'var(--success-700)' } }, 'Slide 2 — Home Insurance') },
            { id: '3', content: React.createElement('div', { style: { height: 200, background: 'var(--primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600, color: 'var(--primary-700)' } }, 'Slide 3 — Travel Insurance') },
          ],
        },
      },
    ],
    props: [
      { name: 'slides', type: 'CarouselSlide[]', required: true, description: 'Array of { id, content } slides' },
      { name: 'autoPlay', type: 'boolean', required: false, default: 'false', description: 'Auto-advance slides' },
      { name: 'autoPlayInterval', type: 'number', required: false, default: '5000', description: 'Auto-play interval in ms' },
    ],
  },

  {
    id: 'cart',
    name: 'Cart',
    tier: 'templates',
    description: 'Order summary panel with item list, total calculation, and checkout CTA.',
    component: Cart as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/templates/Cart/index.tsx',
    variants: [
      {
        label: 'With Items',
        props: {
          items: [
            { id: '1', label: 'MTPL Insurance', description: 'Vehicle CB 1234 AB', price: 240 },
            { id: '2', label: 'Roadside assistance', price: 35 },
          ],
          currency: 'лв.',
          checkoutLabel: 'Proceed to checkout',
        },
      },
      { label: 'Empty', props: { items: [], currency: 'лв.' } },
    ],
    props: [
      { name: 'items', type: 'CartItem[]', required: true, description: 'Array of { id, label, description?, price, removable? }' },
      { name: 'currency', type: 'string', required: false, default: "'лв.'", description: 'Currency symbol' },
      { name: 'onRemove', type: '(itemId: string) => void', required: false, description: 'Remove item handler' },
      { name: 'onCheckout', type: '() => void', required: false, description: 'Checkout CTA handler' },
      { name: 'checkoutLabel', type: 'string', required: false, default: "'Proceed to checkout'", description: 'Checkout button text' },
    ],
  },

  {
    id: 'dashboard-layout',
    name: 'Dashboard Layout',
    tier: 'templates',
    description: 'Full-page layout with sticky navbar, fixed sidebar, and scrollable main content area.',
    component: DashboardLayout as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/templates/DashboardLayout.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          navbar: React.createElement(Navbar as React.ComponentType<Record<string, unknown>>, { title: 'Trusti Dashboard' }),
          sidebar: React.createElement(SidebarOrganism as React.ComponentType<Record<string, unknown>>, {
            activeId: 'policies',
            sections: [{ title: 'Menu', items: [{ id: 'policies', label: 'Policies', href: '#' }, { id: 'claims', label: 'Claims', href: '#' }] }],
          }),
          children: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14 } }, 'Main content area'),
        },
      },
    ],
    props: [
      { name: 'navbar', type: 'React.ReactNode', required: true, description: 'Navbar component' },
      { name: 'sidebar', type: 'React.ReactNode', required: true, description: 'Sidebar component' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Main content' },
    ],
  },

  {
    id: 'faq',
    name: 'FAQ',
    tier: 'templates',
    description: 'Frequently asked questions section using Accordion with a centered title.',
    component: FAQ as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/templates/FAQ/index.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          title: 'Frequently Asked Questions',
          items: [
            { question: 'What is MTPL insurance?', answer: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14, lineHeight: 1.6 } }, 'MTPL (Motor Third Party Liability) insurance is mandatory for all vehicle owners. It covers damages caused to third parties.') },
            { question: 'How do I file a claim?', answer: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14, lineHeight: 1.6 } }, 'You can file a claim online through the Trusti app or by calling our 24/7 support hotline.') },
            { question: 'When does my policy renew?', answer: React.createElement('p', { style: { color: 'var(--primary-700)', fontSize: 14, lineHeight: 1.6 } }, 'Policies are renewed annually. You\'ll receive a reminder 30 days before your policy expires.') },
          ],
        },
      },
    ],
    props: [
      { name: 'title', type: 'string', required: false, default: "'Frequently Asked Questions'", description: 'Section heading' },
      { name: 'items', type: 'FAQItem[]', required: true, description: 'Array of { question, answer } items' },
    ],
  },

  {
    id: 'footer',
    name: 'Footer',
    tier: 'templates',
    description: 'Dark footer with logo, multi-column links, social icons, and legal copy.',
    component: Footer as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/templates/Footer/index.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          logoText: 'Trusti',
          columns: [
            { title: 'Products', links: [{ label: 'Car insurance', href: '#' }, { label: 'Home insurance', href: '#' }, { label: 'Travel insurance', href: '#' }] },
            { title: 'Company', links: [{ label: 'About us', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Blog', href: '#' }] },
            { title: 'Support', links: [{ label: 'Help centre', href: '#' }, { label: 'Contact', href: '#' }, { label: 'Claims', href: '#' }] },
          ],
          socialLinks: [
            { icon: 'fa-facebook', href: '#', label: 'Facebook' },
            { icon: 'fa-instagram', href: '#', label: 'Instagram' },
            { icon: 'fa-linkedin', href: '#', label: 'LinkedIn' },
          ],
          legalText: '© 2025 Trusti. All rights reserved.',
        },
      },
    ],
    props: [
      { name: 'logoText', type: 'string', required: false, default: "'Trusti'", description: 'Brand name in footer' },
      { name: 'columns', type: 'FooterColumn[]', required: true, description: 'Array of { title, links: { label, href }[] }' },
      { name: 'socialLinks', type: 'SocialLink[]', required: false, description: 'Array of { icon, href, label }' },
      { name: 'legalText', type: 'string', required: false, description: 'Copyright/legal copy' },
    ],
  },

  {
    id: 'navigation',
    name: 'Navigation',
    tier: 'templates',
    description: 'Responsive top navigation with logo, desktop links, and mobile hamburger menu.',
    component: Navigation as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/templates/Navigation/index.tsx',
    variants: [
      {
        label: 'Default',
        props: {
          logoText: 'Trusti',
          links: [
            { label: 'Home', href: '#', active: true },
            { label: 'Products', href: '#' },
            { label: 'Claims', href: '#' },
            { label: 'About', href: '#' },
          ],
        },
      },
    ],
    props: [
      { name: 'logoText', type: 'string', required: false, default: "'Trusti'", description: 'Brand name' },
      { name: 'links', type: 'NavLink[]', required: true, description: 'Array of { label, href, active? }' },
      { name: 'actions', type: 'React.ReactNode', required: false, description: 'Right-side actions (e.g. login button)' },
    ],
  },

  {
    id: 'vehicle-details-card',
    name: 'Vehicle Details Card',
    tier: 'templates',
    description: 'Vehicle check card with two states: unauthenticated (locked services + talon input) and authenticated (vehicle info + live service statuses).',
    component: VehicleDetailsCard as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/templates/VehicleDetailsCard/index.tsx',
    variants: [
      {
        label: 'No talon (default)',
        props: {
          talon: false,
          vehicle: { make: 'BMW', model: '3 Series', year: 2016, plate: 'EA 1234 CB', fuel: 'Дизел', engine: '2.0 л.', power: '190 кс.', drive: 'Десен' },
          onTalonSubmit: () => {},
        },
      },
      {
        label: 'No talon — format error',
        props: {
          talon: false,
          vehicle: { make: 'BMW', model: '3 Series', year: 2016, plate: 'EA 1234 CB', fuel: 'Дизел', engine: '2.0 л.', power: '190 кс.', drive: 'Десен' },
          talonError: 'invalid-format',
          onTalonSubmit: () => {},
        },
      },
      {
        label: 'No talon — plate mismatch',
        props: {
          talon: false,
          vehicle: { make: 'BMW', model: '3 Series', year: 2016, plate: 'EA 1234 CB', fuel: 'Дизел', engine: '2.0 л.', power: '190 кс.', drive: 'Десен' },
          talonError: 'plate-mismatch',
          onTalonSubmit: () => {},
        },
      },
      {
        label: 'With talon — loading',
        props: {
          talon: true,
          loading: true,
          vehicle: { make: 'BMW', model: '3 Series', year: 2016, plate: 'EA 1234 CB', fuel: 'Дизел', engine: '2.0 л.', power: '190 кс.', drive: 'Десен', isTaxi: false, isLeasing: true },
          onTalonSubmit: () => {},
        },
      },
      {
        label: 'With talon — statuses',
        props: {
          talon: true,
          vehicle: { make: 'BMW', model: '3 Series', year: 2016, plate: 'EA 1234 CB', fuel: 'Дизел', engine: '2.0 л.', power: '190 кс.', drive: 'Десен', isTaxi: false, isLeasing: true },
          services: [
            { id: 'civil-liability', label: 'Гражданска отговорност', status: 'valid',   href: '#civil-liability' },
            { id: 'kasko',           label: 'Каско',                  status: 'locked' },
            { id: 'vignette',        label: 'Винетка',                status: 'expired', href: '#vignette' },
            { id: 'fines',           label: 'Глоби',                  status: 'warning', href: '#fines' },
            { id: 'reverse-leasing', label: 'Обратен лизинг',         status: 'valid',   href: '#leasing' },
          ],
          onTalonSubmit: () => {},
        },
      },
    ],
    props: [
      { name: 'vehicle',       type: 'VehicleDetails',    required: true,  description: '{ make, model, year, plate, fuel?, engine?, power?, drive?, isTaxi?, isLeasing? }' },
      { name: 'talon',         type: 'boolean',           required: true,  description: 'Authenticated state — true shows vehicle info + service statuses' },
      { name: 'services',      type: 'VehicleService[]',  required: false, description: 'Array of services with statuses — undefined triggers skeleton loading' },
      { name: 'onTalonSubmit', type: '(t: string) => void', required: true, description: 'Called when the user submits the talon input' },
      { name: 'talonError',    type: "'invalid-format' | 'plate-mismatch' | null", required: false, description: 'Validation error to show under the talon input' },
      { name: 'loading',       type: 'boolean',           required: false, default: 'false', description: 'Shows skeleton rows while service statuses are loading' },
    ],
  },

  {
    id: 'google-reviews',
    name: 'Google Reviews',
    tier: 'templates',
    description: 'Testimonial section with animated 3-layer carousel and Google badge. Infinite-looping, touch-enabled, fully responsive.',
    component: GoogleReviews as React.ComponentType<Record<string, unknown>>,
    status: 'stable',
    sourceFile: 'src/components/templates/GoogleReviews/index.tsx',
    variants: [
      {
        label: 'Default',
        props: {},
        background: 'dark',
      },
    ],
    props: [
      { name: 'className', type: 'string', required: false, default: '""', description: 'Additional CSS class name' },
    ],
    notes: [
      {
        title: 'Structure',
        body: `The component is a full-width dark section (.gr-section) containing a rounded container (.gr-container) with a topographic background and an orange radial glow.

Inside the container, .gr-layout holds two columns: .gr-left (heading, Google badge, subtitle) and .gr-right (nav arrows + card carousel).

The carousel lives in .gr-cards-viewport — a fixed-height drag layer. Inside it, two card slots are always rendered via absolute positioning. Each slot holds a .gr-card with one of five colour variants that cycle in strict alternation: dark cards on even indices (surface, surface-adjacent, surface-adjacent-2) and orange cards on odd indices (accent, tertiary). This guarantees one dark and one orange card are always visible together.`,
      },
      {
        title: 'Animation',
        body: `The carousel uses a conveyor-belt pattern powered by motion/react. Only two cards are ever mounted — the active card (slot 0) and the next card (slot 1). Navigation replaces the exiting card via AnimatePresence while the staying card animates to its new slot using the layout prop.

Enter: card slides in from off-screen (x: ±(cardWidth + gap)) while scaling up from 0.3 and fading in.
Exit: mirrors the enter — card scales down to 0.3, fades out, and slides off in the opposite direction.

Spring config: stiffness 560 · damping 36 · mass 0.4. Scale and opacity use a 0.5 s ease curve. Drag is handled by motion's drag="x" with a 40 px / 300 px·s⁻¹ threshold to trigger navigation.`,
      },
      {
        title: 'Responsive layout',
        body: `Layout is driven by a ResizeObserver on the container, not a fixed media query. The hook computes the theoretical card width in the two-column row layout and triggers isMobile when cards would drop below 230 px.

Desktop (isMobile false): two cards side by side in .gr-right.
Mobile peek (isMobile true, CSS column ≤ 767 px): single-card peek layout — the active card fills the content width and the next card peeks 40 px at the right edge.
Forced column (isMobile true, window > 767 px): JS applies .gr-layout--mobile, stacking heading above cards before the CSS breakpoint fires. This prevents the heading and cards from being crammed side by side at intermediate widths.

In all peek modes the viewport bleeds into the right container padding so the peek card always touches the container's right edge. The left edge stays aligned with the heading text.`,
      },
    ],
  },

  // ── Prototypes ──
  {
    id: 'car-leasing-flow',
    name: 'Автолизинг — пълен поток',
    tier: 'prototypes',
    description: 'Стъпков поток за кандидатстване за автолизинг — от лендинг до потвърждение.',
    component: CarLeasingPrototype,
    variants: [
      { label: 'По подразбиране', props: {} },
    ],
    status: 'wip',
    url: '/proto/car-leasing-flow',
  },
  {
    id: 'trusti-one-pager',
    name: 'Trusti One Pager',
    tier: 'prototypes',
    description: 'Единна страница за представяне на Trusti пред партньори и инфлуенсъри.',
    component: TrustiOnePagerPrototype,
    variants: [
      { label: 'По подразбиране', props: {} },
    ],
    status: 'wip',
    url: '/trusti-one-pager.html',
  },
]

export function getByTier(tier: Tier): ComponentEntry[] {
  return registry.filter(c => c.tier === tier)
}

export function getById(id: string): ComponentEntry | undefined {
  return registry.find(c => c.id === id)
}
