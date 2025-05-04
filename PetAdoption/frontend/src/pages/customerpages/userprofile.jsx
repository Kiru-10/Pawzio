import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import API from "../../services/api";

const UserProfile = () => {
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const userId = userFromStorage?.id;

  const [form, setForm] = useState(null);
  const [originalForm, setOriginalForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(""); 

  useEffect(() => {
    if (userId) {
      API.getUserById(userId)
        .then((res) => {
          const userData = res.data;
          const initialForm = {
            ...userData,
            password: "",
            confirmPassword: "",
          };
          setForm(initialForm);
          setOriginalForm(initialForm);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name || form.name.length < 4)
      newErrors.name = "Name must be at least 4 characters";

    if (
      !form.username ||
      form.username.length < 5 ||
      !/\d/.test(form.username) ||
      !/[!@#$%^&*]/.test(form.username)
    )
      newErrors.username =
        "Username must be at least 5 characters and include a number & special character";

    if (form.password) {
      if (
        form.password.length < 6 ||
        !/\d/.test(form.password) ||
        !/[!@#$%^&*]/.test(form.password)
      )
        newErrors.password =
          "Password must be at least 6 characters and include a number & special character";

      if (form.password !== form.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setForm({ ...originalForm, password: "", confirmPassword: "" });
    setErrors({});
    setIsEditing(false);
    setShowPassword(false);
  };

  const handleSave = () => {
    if (validateForm()) {
      const updatedData = { ...form };
      if (!form.password) {
        delete updatedData.password;
        delete updatedData.confirmPassword;
      }

      API.updateUser(userId, updatedData)
        .then(() => {
          const updatedUser = { ...form };
          delete updatedUser.password;
          delete updatedUser.confirmPassword;
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setOriginalForm(updatedUser);
          setForm({ ...updatedUser, password: "", confirmPassword: "" });
          setIsEditing(false);
          setShowPassword(false);
          setToast("✅ Your profile was updated"); 
          setTimeout(() => setToast(""), 3000); 
        })
        .catch((err) => {
          console.error("Error updating profile:", err);
        });
    }
  };

  if (!form) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  return (
    <>
      {/* ✅ Toast Message */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500">
          {toast}
        </div>
      )}

      <main id="content" role="main" className="w-full max-w-md mx-auto p-6 font-['Poppins']">
        <div className="mt-7 bg-white rounded-xl shadow-lg border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">👤 Customer Profile</h1>
              <p className="mt-2 text-sm text-gray-600">Manage your information and credentials here.</p>
            </div>

            <div className="mt-5">
              <form className="grid gap-y-4">
                <div>
                  <label htmlFor="regno" className="block text-sm font-bold ml-1 mb-2 capitalize text-gray-700">
                    Registration No
                  </label>
                  <input
                    type="text"
                    id="regno"
                    name="regno"
                    value={form.regno}
                    onChange={handleChange}
                    disabled
                    className="py-3 px-4 block w-full border-2 rounded-md text-sm shadow-sm bg-gray-100 border-gray-200 cursor-not-allowed"
                  />
                </div>

                {["name", "email", "username"].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-bold ml-1 mb-2 capitalize text-gray-700">
                      {field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`py-3 px-4 block w-full border-2 rounded-md text-sm shadow-sm ${
                        isEditing
                          ? "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          : "bg-gray-100 border-gray-200 cursor-not-allowed"
                      }`}
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}

                <div>
                  <label htmlFor="password" className="block text-sm font-bold ml-1 mb-2 text-gray-700">
                    Password {isEditing && "(leave blank to keep existing)"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`py-3 px-4 block w-full border-2 rounded-md text-sm shadow-sm pr-10 ${
                        isEditing
                          ? "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          : "bg-gray-100 border-gray-200 cursor-not-allowed"
                      }`}
                    />
                    {isEditing && (
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </span>
                    )}
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {isEditing && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-bold ml-1 mb-2 text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full border-2 rounded-md text-sm shadow-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                  >
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="w-1/2 py-3 px-4 rounded-md font-semibold bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm"
                    >
                      💾 Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-1/2 py-3 px-4 rounded-md font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all text-sm"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
