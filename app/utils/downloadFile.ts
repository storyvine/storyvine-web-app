import axios from "axios";
import Cookie from "js-cookie";
import config from "config";
import save from "save-file";
import { get } from "lodash";

interface Props {
  fileUrl: string;
  title: string;
}

export default async ({ fileUrl, title }: Props) => {
  const token = Cookie.get("token");
  const data = JSON.stringify({ fileUrl });
  const result = await axios.post(`${config.bffUri}/download`, data, {
    headers: {
      authorization: token ? `Bearer ${token}` : null,
      "Content-Type": "application/json"
    }
  });
  await (save as (...args: any[]) => Promise<any>)(
    get(result, "data.fileBuffer.data"),
    title
  );
};
