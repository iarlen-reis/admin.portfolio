import { useController, useFormContext } from 'react-hook-form'

interface TextFieldProps {
  name: string
  label: string
  type: string
  defaultValue?: string
}

export default function TextField({
  name,
  label,
  type,
  defaultValue,
  ...rest
}: TextFieldProps) {
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
      <input
        type={type}
        {...inputProps}
        {...rest}
        ref={ref}
        id={name}
        className="font-poppins w-full rounded bg-zinc-300 px-3 py-2 text-base text-zinc-900 outline-none focus:outline-blue-600 disabled:animate-pulse disabled:bg-zinc-400 disabled:text-zinc-500 lg:text-lg"
      />
      {error?.message && (
        <span className="text-xs text-red-500">{error.message}</span>
      )}
    </fieldset>
  )
}
