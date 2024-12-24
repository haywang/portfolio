import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export const models = [
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash',
    description: 'Latest Gemini model from Google'
  },
  {
    id: 'meta-llama/llama-3.1-70b-instruct:free',
    name: 'Llama 3 70B',
    description: "Meta's Llama 3 70B instruction model"
  }
]

interface ModelSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
