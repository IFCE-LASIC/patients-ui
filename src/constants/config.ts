export const SERVER = "http://54.233.219.82:8000/api";

export const mountHeader = (hash:string) => {
  return {
    headers: {
      "XCARDIO-API-KEY": hash,
    },
  }
}