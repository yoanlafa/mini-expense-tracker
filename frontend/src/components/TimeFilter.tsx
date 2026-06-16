interface TimeFilterProps{
    onStartDateChange: (startDate: string) => void;
    onEndDateChange: (endDate: string) => void;
}

function TimeFilterFields({onStartDateChange, onEndDateChange}: TimeFilterProps){
    return (
        <div className="mb-6 flex gap-3">
            <input
                type="date"
                onChange={(e)=> onStartDateChange(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                />

            <input
            type="date"
            onChange={(e)=> onEndDateChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            />
        </div>
    )
}

export default TimeFilterFields;