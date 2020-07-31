/// <reference types="react" />
interface SearchInputProps {
    method?: string;
    extraData?: {
        [key: string]: any;
    };
    searchKey?: string;
    labelKey?: string;
    valueKey?: string;
    pageSize?: number;
    customOptionRender?: (data: any) => JSX.Element | null;
    customOptionFilter?: (data: any) => boolean;
    onChange?: (value: any) => void;
    value?: any;
    id?: any;
    placeholder?: string;
    exclude?: any | any[];
}
declare function SearchInput(props: SearchInputProps): JSX.Element;
export default SearchInput;
