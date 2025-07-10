
```
/app
├── error.tsx
├── globals.css
├── icon.svg
├── layout.tsx
├── loading.tsx
├── not-found.tsx
├── auth
│   ├── sign-in
│   │   └── page.tsx
│   ├── sign-up
│   │   └── page.tsx
│   └── layout.tsx
├── root
│   ├── layout.tsx
│   ├── page.tsx
│   ├── account
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── appointments
│   │       ├── edit[appointmentId]
│   │       │   └── page.tsx
│   │       └── page.tsx
│   ├── customers
│   │   └── [userId]new-appointment
│   │       ├── page.tsx
│   │       └── confirmed
│   │           └── page.tsx
│   └── dashboard
│       └── page.tsx

/components
├── forms
│   ├── AppointmentForm.tsx
│   ├── FormRow.tsx
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── tables
│   └── AppointmentTable.tsx
├── AccountNavigation.tsx
├── AppointmentAction.tsx
├── AppointmentList.tsx
├── BackButton.tsx
├── Button.tsx
├── DateSelector.tsx
├── DeleteAppointment.tsx
├── Input.tsx
├── Logout.tsx
├── Spinner.tsx
├── StateCard.tsx
├── StatusMini.tsx
└── Table.tsx

/lib
├── actions
│   ├── appointment.action.ts
│   └── customer.actions.ts
├── appwrite.config.ts
├── constants.ts
└── utils.ts

/public
└── (statičke datoteke: slike, favicon itd.)

/types
├── appwrite.types.ts
└── index.d.ts

```
