import CalendarLocale from "rc-picker/lib/locale/pt_BR";
import { PickerLocale } from "antd/es/date-picker/generatePicker";

const pickerLocale: PickerLocale = {
  lang: {
    placeholder: "Selecionar data",
    rangePlaceholder: ["Início", "Fim"],
    ...CalendarLocale,
  },
  timePickerLocale: {
    placeholder: "Selecionar hora",
  },
};

export default pickerLocale;
