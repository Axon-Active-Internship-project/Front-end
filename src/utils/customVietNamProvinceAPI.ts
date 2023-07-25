import { getDistricts, getWards } from "vietnam-provinces";
import { IDistrict, IWard } from "../interfaces";

export const getDistrictWithDetail = (
  provinceCode: string,
  districtCode: string
) => {
  const districts: IDistrict[] = getDistricts(provinceCode);

  const district = districts.find(({ code }) => code === districtCode);

  return district;
};

export const getWardWithDetail = (districtCode: string, wardCode: string) => {
  const wards: IWard[] = getWards(districtCode);

  const ward = wards.find(({ code }) => code === wardCode);

  return ward;
};
