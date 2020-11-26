import { getImage } from '../common';

export function useUtils() {
    return {
        // prefixCls: 'sui-' 
        prefixCls: PREFIX_CLS,
        getImage: getImage 
    };
}
