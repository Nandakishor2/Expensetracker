type FormFieldGroupSelectProps = {
    id: string;
    name: string;
    labelName: string;
    value: string;
    dropdownItems: object;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectGroup({ id, name, labelName, value, dropdownItems, onChange }: FormFieldGroupSelectProps) {
    return (
        <>
            <div className="w-full">
                <label htmlFor={id} className="block text-sm/6 font-medium text-white">{labelName}</label>
                <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                        <select
                            id={id}
                            name={name}
                            value={value || ""}
                            onChange={onChange}
                            className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6">
                            {
                                Object.entries(dropdownItems).map(([key, value]) => (<option key={key} className="text-black bg-white" value={key}>{value}</option>))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectGroup