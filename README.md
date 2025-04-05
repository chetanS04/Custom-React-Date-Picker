# Custom-React-Date-Picker
Custom React Date Picker 

This **is a custom date picker** component built in **React**.

### ✅ It handles:
- **Custom format types** (like `yyyy-dd-mm`, `dd-mm-yyyy`, etc.)
- **Month navigation**
- **Year selection** with a dynamic range (from `minYear` to `maxYear`)
- **Click outside to close**
- **Position control** (`top`, `bottom`, `left`, `right`)
- **Day selection with highlighting**
- Read-only input that triggers the date picker on focus

---

### 📦 How it works:
- It uses `date-fns` for formatting and calculating days in a month.
- The calendar UI is fully built with Tailwind CSS and React.
- The selected date is stored in state and formatted based on the `formatType` prop.

---

### ✅ Customization:
You can extend or tweak it easily:
- Add time selection
- Allow typing dates manually
- Add validation
- Disable past/future dates
- Localize day names (`Sun`, `Mon`, etc.)

