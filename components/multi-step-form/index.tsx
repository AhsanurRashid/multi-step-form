"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema, FormValues } from "@/lib/form-schema"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { steps } from "@/lib/data"
import PersonalInfoStep from "@/components/form-steps/personal-info-step"
import AddressStep from "@/components/form-steps/address-step"
import AccountStep from "@/components/form-steps/account-step"
import ReviewStep from "@/components/form-steps/review-step"
import { Check, ChevronRight } from "lucide-react"
import FormProgress from "@/components/form-progress"
import { useFormDataStore } from "@/lib/store"

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false) 
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    })

    const getStepSchema = (step: number) => {
        switch (step) {
            case 0:
                return formSchema.innerType().pick({
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                })
            case 1:
                return formSchema.innerType().pick({
                    street: true,
                    city: true,
                    state: true,
                    zipCode: true,
                })  
            case 2:
                return formSchema.innerType()
                .pick({
                    username: true,
                    password: true,
                    confirmPassword: true,
                })
                .refine((data) => data.password === data.confirmPassword, {
                    message: "Passwords do not match",
                    path: ["confirmPassword"],
                })
            default:
                return formSchema.innerType()
        }
    }

    const handleNext = async () => {
        const stepSchema = getStepSchema(currentStep)
    
        // Get the fields for the current step
        const shape = "shape" in stepSchema ? stepSchema.shape : {};
        const fields = Object.keys(shape) as Array<keyof FormValues>;
    
        // Validate only the fields for the current step
        const stepValues: Partial<FormValues> = {}
        fields.forEach((field) => {
          stepValues[field] = form.getValues(field)
        })
    
        // Validate the current step
        const result = await form.trigger(fields as any)
    
        if (result) {
            useFormDataStore.getState().setFromData(stepValues);
            if (currentStep < steps.length - 1) {
                setCurrentStep((prev) => prev + 1)
            }
        }
    }
    
      // Handle previous step
      const handlePrevious = () => {
        if (currentStep > 0) {
          setCurrentStep((prev) => prev - 1)
        }
      }

      const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true)
        useFormDataStore.getState().setFromData(data);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 5000))
    
        console.log("Form submitted:", data)
        setIsSubmitting(false)
        setIsSubmitted(true)
      }

      const renderStep = () => {
        switch (currentStep) {
          case 0:
            return <PersonalInfoStep />
          case 1:
            return <AddressStep />
          case 2:
            return <AccountStep />
          case 3:
            return <ReviewStep />
          default:
            return null
        }
      }

      if (isSubmitted) {
        return (
          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Form Submitted Successfully!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for completing the form. We have received your information.
                </p>
                <Button
                  onClick={() => {
                    form.reset()
                    setCurrentStep(0)
                    setIsSubmitted(false)
                    localStorage.removeItem("form-data-storage")
                  }}
                >
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="mb-8">
                    <FormProgress currentStep={currentStep} steps={steps} />
                </div>
                <Card className="w-full">
                    <CardContent>
                        {renderStep()}

                        <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                            Previous
                        </Button>

                        {currentStep < steps.length - 1 &&
                            <Button type="button" onClick={handleNext}>
                                Next <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        }

                        {currentStep === steps.length - 1 &&
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        }
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

export default MultiStepForm