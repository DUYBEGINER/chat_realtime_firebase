// validators.js

// Regex patterns
export const patterns = {
  // Email cơ bản (đủ dùng cho UI)
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,

  // Mật khẩu mạnh: >=8, có thường, HOA, số, ký tự đặc biệt
  passwordStrong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,

  // Username: 3-20 ký tự, chữ/số/_ , không khoảng trắng
  username: /^(?=.{3,20}$)[a-zA-Z0-9_]+$/,

  // Họ tên (có dấu, cho phép khoảng trắng, dấu . ' - ), độ dài 2-50
  fullName: /^[\p{L}][\p{L}\s'.-]{0,48}[\p{L}]$/u,

  // SĐT Việt Nam: +84 hoặc 0, bắt đầu 3/5/7/8/9, đủ 10 số
  phoneVN: /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/
};

// Hàm validate đăng ký
export function validateSignup(form) {
  // form: { email, password, confirmPassword, username, fullName, phone }
  const errors = {};

  const email = (form.email || "").trim();
  const password = form.password || "";
  const confirmPassword = form.confirmPassword || "";
  const username = (form.username || "").trim();


  if (!email || !patterns.email.test(email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!password || !patterns.passwordStrong.test(password)) {
    errors.password =
      "Mật khẩu phải ≥ 8 ký tự, có chữ thường, HOA, số và ký tự đặc biệt.";
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = "Xác nhận mật khẩu không khớp.";
  }

  if (username && !patterns.username.test(username)) {
    errors.username =
      "Username 3-20 ký tự, chỉ gồm chữ/số/underscore, không khoảng trắng.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
