import Select from 'react-select'
import { useTheme } from '../../../context/ThemeContext';

const selectStyles = (isDark: boolean) => ({
    control: (base: any) => ({
        ...base,
        width: '100%',
        fontSize: '0.875rem',
        color: isDark ? 'white' : 'rgb(55 65 81)',
        backgroundColor: isDark ? '#101828' : 'white',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgb(209 213 219)',
        borderRadius: '0.5rem',
        appearance: 'none',
        height: '2.25rem',
        '&:hover': {
            borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgb(156 163 175)'
        }
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected
            ? 'rgb(59 130 246)'
            : state.isFocused
                ? isDark ? 'rgba(255,255,255,0.1)' : 'rgb(219 234 254)'
                : 'transparent',
        color: state.isSelected
            ? 'white'
            : isDark ? 'rgba(255,255,255,0.9)' : 'rgb(55 65 81)',
        cursor: 'pointer',
        padding: '6px 12px'
    }),
    menu: (base: any) => ({
        ...base,
        borderRadius: '0.5rem',
        backgroundColor: isDark ? '#101828' : 'white',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgb(209 213 219)',
        maxHeight: '300px', // Increased height
        overflowY: 'hidden',
        overflowX: 'hidden',

    }),
    singleValue: (base: any) => ({
        ...base,
        color: isDark ? 'rgba(255,255,255,0.9)' : 'rgb(55 65 81)'
    })
});

interface SearchSelectProps {
    options: any[];
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    isDisabled?: boolean;
}

const SearchSelect = ({ options, value, onChange, placeholder, isDisabled }: SearchSelectProps) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            styles={{
                ...selectStyles(useTheme().theme === 'dark'),
                placeholder: (base: any) => ({
                    ...base,
                    color: useTheme().theme === 'dark' ? 'white' : 'rgb(55 65 81)'
                })
            }}
            isDisabled={isDisabled}
            className="min-w-[150px] z-100"
        />
    )
}

export default SearchSelect;