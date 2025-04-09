import { ModeToggle } from "@/components/mode-toggle"
import MultiStepForm from "@/components/multi-step-form"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto p-4 mt-10">

      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      
      <div className="max-w-3xl mx-auto">
        <MultiStepForm />
      </div>
      
    </div>
  )
}

