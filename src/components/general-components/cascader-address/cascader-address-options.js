import { cloneDeep } from 'lodash';
import Provinces from 'china-division/dist/provinces.json';
import Cities from 'china-division/dist/cities.json';
import Areas from 'china-division/dist/areas.json';
import Hkmotw from 'china-division/dist/HK-MO-TW.json';
import Pcas from 'china-division/dist/pcas.json';

let provinces = cloneDeep(Provinces);
let cities = cloneDeep(Cities);
let areas = cloneDeep(Areas);
let hkmotw = cloneDeep(Hkmotw);
let pcas = cloneDeep(Pcas);

areas.forEach((area) => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.name,
    });
  }
});

cities.forEach((city) => {
  const matchProvince = provinces.filter(province => province.code === city.provinceCode)[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.name,
      children: city.children,
    });
  }
});

// 合并港澳台行政区
const _hkmotw = Object.entries(hkmotw).map(([provinceName, provinceItem]) => {
  return {
    label: provinceName,
    value: provinceName, // (Math.random() * 1e10).toFixed(),
    children: Object.entries(provinceItem).map(([cityName, cityItem]) => {
      return {
        label: cityName,
        value: cityName, // (Math.random() * 1e10).toFixed(),
        children: cityItem.map(area => {
          return {
            label: area,
            value: area, // (Math.random() * 1e10).toFixed()
          }
        })
      }
    })
  }
});

let options = provinces.map(province => ({
  label: province.name,
  value: province.name, // province.code,
  children: province.children,
}));

options = options.concat(_hkmotw);

// 获取街道
export const getStreets = (p, c, a) => {
  if (p.match(RegExp(/香港|澳门|台湾/))) {
    return []
  }
  const street = pcas[p][c][a];
  if (Object.prototype.toString.call(street) === '[object Array]' && street.length) {
    const s = street.map(e => ({ label: e, value: e}));
    return s;
  }
}

export default options;
