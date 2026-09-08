/*
The last seen location must be selected interactively by clicking on a Leaflet map; 
the selected coordinates must be reverse-geocoded into a human-readable address using the 
Nominatim API (https://nominatim.openstreetmap.org) and displayed back to the user before submission

https://nominatim.org/release-docs/develop/api/Reverse/
*/

// https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>&<params>

export default async function Nominatim(lat: number, lng: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&layer=address`,
  ); // want the "name" for the pin

  if (!res.ok) throw new Error(`Unable to fetch location: ${res.status}`);
  const json = await res.json();

  return json.display_name; 
}
