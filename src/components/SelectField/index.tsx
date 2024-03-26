import { useController, useFormContext } from 'react-hook-form'

interface SelectFieldProps {
  name: string
  label: string
  defaultValue?: string
  options?: Record<string, any>[]
}

export default function SelectField({
  name,
  label,
  options,
  defaultValue,
  ...rest
}: SelectFieldProps) {
  const { control } = useFormContext()

  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: 'Este campo é obrigatório.' },
    defaultValue: defaultValue || '',
  })
  return (
    <fieldset className="flex w-full flex-col gap-1.5">
      <label htmlFor={name} className="text-lg uppercase text-zinc-500">
        {label}
      </label>
      <select
        {...inputProps}
        {...rest}
        ref={ref}
        id={name}
        className="font-poppins h-11 w-full rounded bg-zinc-300 px-3 text-base text-zinc-900 outline-none focus:outline-blue-600 disabled:animate-pulse disabled:bg-zinc-400 disabled:text-zinc-500 lg:text-lg"
      >
        <option value="">Selecione uma opção</option>
        {options?.map((option) => (
          <option key={option.id} value={option.url}>
            {option.name}
          </option>
        ))}
      </select>
      {error?.message && (
        <span className="text-xs text-red-500">{error.message}</span>
      )}
    </fieldset>
  )
}
