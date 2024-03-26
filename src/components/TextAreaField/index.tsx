import { useController, useFormContext } from 'react-hook-form'

interface TextAreaFieldProps {
  name: string
  label: string
  defaultValue?: string
}

export default function TextAreaField({
  name,
  label,
  defaultValue,
  ...rest
}: TextAreaFieldProps) {
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
    <fieldset className="flex max-w-full flex-col gap-1.5">
      <label htmlFor={name} className="text-lg uppercase text-zinc-500">
        {label}
      </label>
      <textarea
        className="font-poppins w-full rounded border-none bg-zinc-300 px-3 py-2 text-base text-zinc-900 outline-none focus:outline-blue-600 disabled:animate-pulse disabled:bg-zinc-400 disabled:text-zinc-500 lg:text-lg"
        ref={ref}
        {...inputProps}
        {...rest}
        id={name}
        rows={8}
      />
      {error && <small className="text-red-500">{error.message}</small>}
    </fieldset>
  )
}
