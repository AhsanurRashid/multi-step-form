import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
}

interface FormProgressProps {
  steps: Step[]
  currentStep: number
}

export default function FormProgress({ steps, currentStep }: FormProgressProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? "border-green-600 bg-green-600 text-white"
                      : isCurrent
                        ? "border-primary bg-primary text-white dark:text-black"
                        : "border-gray-300 text-gray-300"
                  }`}
                >
                  {isCompleted ? <Check className="h-6 w-6" /> : <span>{index + 1}</span>}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-10 h-0.5 w-[calc(100%-2.5rem)] -translate-y-1/2 ${
                      index < currentStep ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  isCurrent ? "font-medium text-primary" : isCompleted ? "text-green-600" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
