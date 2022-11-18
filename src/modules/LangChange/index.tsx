import React, { useContext } from 'react'
import { useTranslation } from "react-i18next";
import Select from 'antd/es/select';

const LangChange = (props: any) => {
    const langs = [{
        value: 'en',
        label: 'English',
    }, {
        value: 'de',
        label: 'German',
    }
    ];
    const { t, i18n } = useTranslation();

    const onChange = (value: string) => {
        i18n.changeLanguage(value);
    }

    return (<div className="lang_change">
        <Select
            defaultValue="en"
            style={{ width: 120 }}
            onChange={onChange}
            options={langs} />
    </div>)
}

export default LangChange
