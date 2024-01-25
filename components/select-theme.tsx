import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { changeTheme } from "@/redux/feature/sidebarSlice";
import { useTheme } from "next-themes";

export const SelectTheme = () => {
  const { theme, setTheme } = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const handleThemeChange = (event: any) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    dispatch(changeTheme());
  };

  return (
    <div>
      <select
        id="themeSelect"
        className="w-full p-2 rounded border"
        value={theme}
        onChange={handleThemeChange}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        {/* <option value="system">System</option> */}
      </select>
    </div>
  );
};
