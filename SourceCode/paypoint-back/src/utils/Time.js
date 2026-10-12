import dayjs from "dayjs";
import "dayjs/locale/id.js";
import utc from "dayjs/plugin/utc.js";
import timeZone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timeZone);
dayjs.locale("id");
dayjs.tz.setDefault("Asia/Jakarta");

const TIMEFORMAT = dayjs;

export default TIMEFORMAT;