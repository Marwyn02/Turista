export default function CityComboBox() {
  return (
    <>
      <select
        name="city"
        id="city"
        className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 
              focus:ring-inset focus:ring-indigo-600 sm:max-w-xs 
              sm:text-sm sm:leading-6"
      >
        <option value="batangas" key="1">
          Batangas
        </option>
        <option value="cavite" key="2">
          Cavite
        </option>
        <option value="laguna" key="3">
          Laguna
        </option>
        <option value="muntinlupa" key="4">
          Muntinlupa
        </option>
      </select>
    </>
  );
}
