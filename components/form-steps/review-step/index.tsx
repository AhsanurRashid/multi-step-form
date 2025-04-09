"use client"

import { useFormContext } from "react-hook-form"

export default function ReviewStep() {
  const { getValues } = useFormContext()
  const values = getValues()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Review Your Information</h2>
        <p className="text-muted-foreground">Please review your information before submitting.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 gap-2 rounded-lg border p-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">First Name</p>
              <p>{values.firstName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Name</p>
              <p>{values.lastName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{values.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{values.phone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Address</h3>
          <div className="grid grid-cols-1 gap-2 rounded-lg border p-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Street</p>
              <p>{values.street}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">City</p>
              <p>{values.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">State</p>
              <p>{values.state}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Zip Code</p>
              <p>{values.zipCode}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Account</h3>
          <div className="grid grid-cols-1 gap-2 rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Username</p>
              <p>{values.username}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Password</p>
              <p>••••••••</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
