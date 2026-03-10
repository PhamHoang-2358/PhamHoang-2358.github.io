 
<%@page contentType="text/html" pageEncoding="UTF-8"%>
 <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Nhập - Hệ Thống Quản Lý Công Cụ</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-blue: #0066cc;
            --primary-dark: #004c99;
            --secondary-blue: #e6f2ff;
            --gray-50: #f8f9fa;
            --gray-100: #e9ecef;
            --gray-200: #dee2e6;
            --gray-300: #ced4da;
            --gray-500: #6c757d;
            --gray-700: #343a40;
            --gray-800: #212529;
            --white: #ffffff;
            --danger: #dc3545;
            --success: #28a745;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }

        /* Animated background */
        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
            animation: backgroundMove 15s ease-in-out infinite;
        }

        @keyframes backgroundMove {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }

        /* Floating shapes */
        .shape {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            animation: float 20s infinite ease-in-out;
        }

        .shape1 {
            width: 300px;
            height: 300px;
            top: -150px;
            left: -150px;
            animation-delay: 0s;
        }

        .shape2 {
            width: 200px;
            height: 200px;
            bottom: -100px;
            right: -100px;
            animation-delay: 5s;
        }

        .shape3 {
            width: 150px;
            height: 150px;
            top: 50%;
            right: 10%;
            animation-delay: 10s;
        }

        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(30px, -30px) rotate(90deg);
            }
            50% {
                transform: translate(-20px, 20px) rotate(180deg);
            }
            75% {
                transform: translate(20px, 30px) rotate(270deg);
            }
        }

        /* Login container */
        .login-container {
            position: relative;
            z-index: 10;
            width: 100%;
            max-width: 450px;
            animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .login-card {
            background: var(--white);
            border-radius: 16px;
            box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.1);
            overflow: hidden;
        }

        /* Header */
        .login-header {
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-dark) 100%);
            padding: 40px 40px 30px;
            text-align: center;
            position: relative;
        }

        .login-header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: var(--white);
            border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }

        .logo {
            width: 70px;
            height: 70px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            backdrop-filter: blur(10px);
        }

        .logo i {
            font-size: 32px;
            color: var(--white);
        }

        .login-title {
            color: var(--white);
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .login-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            font-weight: 400;
        }

        /* Form */
        .login-body {
            padding: 40px;
        }

        .form-group {
            margin-bottom: 24px;
            position: relative;
        }

        .form-label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 600;
            color: var(--gray-700);
        }

        .input-wrapper {
            position: relative;
        }

        .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray-500);
            font-size: 16px;
            transition: color 0.3s;
        }

        .form-control {
            width: 100%;
            padding: 14px 16px 14px 48px;
            border: 2px solid var(--gray-200);
            border-radius: 10px;
            font-size: 15px;
            font-family: 'Inter', sans-serif;
            transition: all 0.3s;
            background: var(--gray-50);
        }

        .form-control:focus {
            outline: none;
            border-color: var(--primary-blue);
            background: var(--white);
            box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.1);
        }

        .form-control:focus + .input-icon {
            color: var(--primary-blue);
        }

        .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--gray-500);
            cursor: pointer;
            padding: 8px;
            transition: color 0.3s;
        }

        .password-toggle:hover {
            color: var(--primary-blue);
        }

        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            font-size: 14px;
        }

        .remember-me {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
        }

        .remember-me input[type="checkbox"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
            accent-color: var(--primary-blue);
        }

        .remember-me label {
            color: var(--gray-700);
            cursor: pointer;
        }

        .forgot-password {
            color: var(--primary-blue);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }

        .forgot-password:hover {
            color: var(--primary-dark);
            text-decoration: underline;
        }

        .btn-login {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-dark) 100%);
            color: var(--white);
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            position: relative;
            overflow: hidden;
        }

        .btn-login::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }

        .btn-login:hover::before {
            left: 100%;
        }

        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 102, 204, 0.3);
        }

        .btn-login:active {
            transform: translateY(0);
        }

        .btn-login.loading {
            pointer-events: none;
            opacity: 0.8;
        }

        .spinner {
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid var(--white);
            border-radius: 50%;
            width: 18px;
            height: 18px;
            animation: spin 0.8s linear infinite;
            display: none;
        }

        .btn-login.loading .spinner {
            display: block;
        }

        .btn-login.loading .btn-text {
            display: none;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Divider */
        .divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 30px 0;
            color: var(--gray-500);
            font-size: 13px;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid var(--gray-200);
        }

        .divider span {
            padding: 0 16px;
            font-weight: 500;
        }

        /* Social Login */
        .social-login {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 24px;
        }

        .btn-social {
            padding: 12px;
            border: 2px solid var(--gray-200);
            border-radius: 8px;
            background: var(--white);
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            color: var(--gray-700);
        }

        .btn-social:hover {
            border-color: var(--primary-blue);
            background: var(--secondary-blue);
            transform: translateY(-2px);
        }

        .btn-social i {
            font-size: 18px;
        }

        .btn-google i { color: #DB4437; }
        .btn-microsoft i { color: #00A4EF; }

        /* Footer */
        .login-footer {
            text-align: center;
            padding: 0 40px 40px;
            color: var(--gray-500);
            font-size: 14px;
        }

        .login-footer a {
            color: var(--primary-blue);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s;
        }

        .login-footer a:hover {
            color: var(--primary-dark);
            text-decoration: underline;
        }

        /* Alert */
        .alert {
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            display: none;
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .alert.show {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .alert-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .alert i {
            font-size: 16px;
        }

        /* Extra info */
        .extra-info {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            color: rgba(255, 255, 255, 0.9);
            font-size: 13px;
            z-index: 5;
        }

        .extra-info a {
            color: var(--white);
            text-decoration: underline;
            margin: 0 4px;
        }

        /* Responsive */
        @media (max-width: 480px) {
            .login-container {
                max-width: 100%;
            }

            .login-header {
                padding: 30px 24px 20px;
            }

            .login-body {
                padding: 30px 24px;
            }

            .login-footer {
                padding: 0 24px 30px;
            }

            .login-title {
                font-size: 20px;
            }

            .social-login {
                grid-template-columns: 1fr;
            }
        }

        /* Demo credentials box */
        .demo-credentials {
            background: var(--secondary-blue);
            border: 1px solid var(--primary-blue);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
            font-size: 13px;
        }

        .demo-credentials h4 {
            color: var(--primary-dark);
            margin-bottom: 8px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .demo-credentials p {
            color: var(--gray-700);
            margin: 4px 0;
            font-family: 'Courier New', monospace;
        }

        .demo-credentials strong {
            color: var(--primary-dark);
        }
    </style>
</head>
<body>
    <!-- Floating shapes -->
    <div class="shape shape1"></div>
    <div class="shape shape2"></div>
    <div class="shape shape3"></div>

    <!-- Login Container -->
    <div class="login-container">
        <div class="login-card">
            <!-- Header -->
            <div class="login-header">
                <div class="logo">
                    <i class="fas fa-tools"></i>
                </div>
                <h1 class="login-title">Đăng Nhập Hệ Thống</h1>
                <p class="login-subtitle">Quản Lý Công Cụ - Dụng Cụ</p>
            </div>

            <!-- Body -->
            <div class="login-body">
                <!-- Alert -->
                <div class="alert alert-error" id="alertBox">
                    <i class="fas fa-exclamation-circle"></i>
                    <span id="alertMessage"></span>
                </div>

             

                <!-- Login Form -->
                <form id="loginForm">
                    <div class="form-group">
                        <label class="form-label">Tên đăng nhập</label>
                        <div class="input-wrapper">
                            <input 
                                type="text" 
                                class="form-control" 
                                id="username" 
                                placeholder="Nhập tên đăng nhập"
                                required
                                autocomplete="username"
                            >
                            <i class="fas fa-user input-icon"></i>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Mật khẩu</label>
                        <div class="input-wrapper">
                            <input 
                                type="password" 
                                class="form-control" 
                                id="password" 
                                placeholder="Nhập mật khẩu"
                                required
                                autocomplete="current-password"
                            >
                            <i class="fas fa-lock input-icon"></i>
                            <button type="button" class="password-toggle" id="togglePassword">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    <div class="form-options">
                        <div class="remember-me">
                            <input type="checkbox" id="rememberMe">
                            <label for="rememberMe">Ghi nhớ đăng nhập</label>
                        </div>
                        <a href="#" class="forgot-password">Quên mật khẩu?</a>
                    </div>

                    <button type="submit" class="btn-login" id="btnLogin">
                        <span class="btn-text">
                            <i class="fas fa-sign-in-alt"></i>
                            Đăng Nhập
                        </span>
                        <div class="spinner"></div>
                    </button>
                </form>

               
            </div>

           
        </div>
    </div>

    <!-- Extra Info -->
    <div class="extra-info">
        © 2025 Equipment Management System. 
        <a href="#">Điều khoản</a> | 
        <a href="#">Bảo mật</a> | 
        <a href="#">Hỗ trợ</a>
    </div>

    <script>
        // Toggle password visibility
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');

        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });

        // Alert functions
        function showAlert(message, type = 'error') {
            const alertBox = document.getElementById('alertBox');
            const alertMessage = document.getElementById('alertMessage');
            
            alertBox.className = `alert alert-${type} show`;
            alertMessage.textContent = message;

            setTimeout(() => {
                alertBox.classList.remove('show');
            }, 5000);
        }

        function hideAlert() {
            const alertBox = document.getElementById('alertBox');
            alertBox.classList.remove('show');
        }

        // Login form submission
        const loginForm = document.getElementById('loginForm');
        const btnLogin = document.getElementById('btnLogin');

        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            hideAlert();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Validate
            if (!username || !password) {
                showAlert('Vui lòng nhập đầy đủ thông tin đăng nhập', 'error');
                return;
            }

            // Show loading
            btnLogin.classList.add('loading');

            // Simulate API call
            setTimeout(() => {
                // Demo authentication
                const validUsers = {
                    'admin': '123456',
                    'user': '123456'
                };

                if (validUsers[username] && validUsers[username] === password) {
                    // Success
                    showAlert('Đăng nhập thành công! Đang chuyển hướng...', 'success');
                    
                    // Store credentials if remember me
                    if (rememberMe) {
                        localStorage.setItem('rememberedUser', username);
                    }

                    // Store login session
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('role', username === 'admin' ? 'admin' : 'user');

                    // Redirect to dashboard
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    // Error
                    showAlert('Tên đăng nhập hoặc mật khẩu không chính xác', 'error');
                    btnLogin.classList.remove('loading');
                }
            }, 1500);
        });

        // Auto-fill remembered user
        window.addEventListener('load', function() {
            const rememberedUser = localStorage.getItem('rememberedUser');
            if (rememberedUser) {
                document.getElementById('username').value = rememberedUser;
                document.getElementById('rememberMe').checked = true;
            }
        });

        // Social login handlers
        document.querySelector('.btn-google').addEventListener('click', function() {
            showAlert('Đăng nhập bằng Google - Chức năng đang phát triển', 'error');
        });

        document.querySelector('.btn-microsoft').addEventListener('click', function() {
            showAlert('Đăng nhập bằng Microsoft - Chức năng đang phát triển', 'error');
        });

        // Forgot password handler
        document.querySelector('.forgot-password').addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('Tính năng quên mật khẩu đang được phát triển', 'error');
        });

        // Enter key handler
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    </script>
</body>
</html>