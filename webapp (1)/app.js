// ====================================
// EQUIPMENT MANAGEMENT SYSTEM
// Modern ES6+ Class-based Architecture
// ====================================

// ====================================
// 1. DATA STORE (State Management)
// ====================================
class DataStore {
    constructor() {
        this.equipmentData = this.initializeSampleData();
        this.filteredData = [...this.equipmentData];
        this.selectedRows = new Set();
        this.currentPage = 1;
        this.rowsPerPage = 50;
        this.sortConfig = {
            column: null,
            direction: 'asc'
        };
        this.filters = {
            search: '',
            status: '',
            demand: '',
            year: ''
        };
        this.currentEditId = null;
        this.panelMode = 'add'; // 'add', 'edit', 'view'
    }

    initializeSampleData() {
        return [
            {
                id: 1,
                name: "Máy hàn điện tử Inverter",
                serial: "INV-2023-001",
                quantity: 5,
                unit: "Máy",
                yearManufacture: 2022,
                yearUse: 2023,
                country: "Nhật Bản",
                brand: "Panasonic",
                model: "YC-300BZ3",
                capacity: "300A, 220V",
                status: "Đang sử dụng",
                demand: "Thường xuyên",
                note: "Bảo dưỡng định kỳ 6 tháng/lần"
            },
            {
                id: 2,
                name: "Máy cắt Plasma CNC",
                serial: "PLS-2022-045",
                quantity: 2,
                unit: "Bộ",
                yearManufacture: 2021,
                yearUse: 2022,
                country: "Đức",
                brand: "Hypertherm",
                model: "Powermax 125",
                capacity: "125A, 400V",
                status: "Đang sử dụng",
                demand: "Thường xuyên",
                note: "Thay vòi phun 3 tháng/lần"
            },
            {
                id: 3,
                name: "Máy khoan từ",
                serial: "DRL-2020-112",
                quantity: 8,
                unit: "Cái",
                yearManufacture: 2019,
                yearUse: 2020,
                country: "Hàn Quốc",
                brand: "BDS",
                model: "MAB 825",
                capacity: "25mm, 1200W",
                status: "Nhàn rỗi",
                demand: "Theo đợt",
                note: "Sửa chữa lần cuối 12/2024"
            },
            {
                id: 4,
                name: "Cần trục di động 5 tấn",
                serial: "CRN-2023-008",
                quantity: 3,
                unit: "Bộ",
                yearManufacture: 2023,
                yearUse: 2023,
                country: "Trung Quốc",
                brand: "XCMG",
                model: "QY50KC",
                capacity: "5 tấn, 12m",
                status: "Đang sử dụng",
                demand: "Thường xuyên",
                note: "Kiểm định an toàn 1 năm/lần"
            },
            {
                id: 5,
                name: "Máy mài góc",
                serial: "GRD-2021-234",
                quantity: 15,
                unit: "Cái",
                yearManufacture: 2021,
                yearUse: 2021,
                country: "Nhật Bản",
                brand: "Makita",
                model: "9558HN",
                capacity: "125mm, 840W",
                status: "Đang sử dụng",
                demand: "Thường xuyên",
                note: ""
            },
            {
                id: 6,
                name: "Máy đo độ dày siêu âm",
                serial: "UT-2022-067",
                quantity: 4,
                unit: "Cái",
                yearManufacture: 2022,
                yearUse: 2022,
                country: "Mỹ",
                brand: "GE",
                model: "DM5E",
                capacity: "0.75-300mm",
                status: "Hỏng",
                demand: "Theo đợt",
                note: "Cần thay đầu dò"
            },
            {
                id: 7,
                name: "Máy nén khí trục vít",
                serial: "COM-2019-023",
                quantity: 6,
                unit: "Máy",
                yearManufacture: 2018,
                yearUse: 2019,
                country: "Thụy Điển",
                brand: "Atlas Copco",
                model: "GA 37",
                capacity: "37kW, 6.5m³/min",
                status: "Đang sử dụng",
                demand: "Thường xuyên",
                note: "Bảo dưỡng 2000h/lần"
            },
            {
                id: 8,
                name: "Kích thủy lực 50 tấn",
                serial: "HYD-2023-145",
                quantity: 10,
                unit: "Cái",
                yearManufacture: 2023,
                yearUse: 2023,
                country: "Hàn Quốc",
                brand: "Masada",
                model: "MH-50",
                capacity: "50 tấn, 150mm",
                status: "Nhàn rỗi",
                demand: "Theo đợt",
                note: ""
            },
            {
                id: 9,
                name: "Máy hàn hồ quang chìm SAW",
                serial: "SAW-2020-089",
                quantity: 3,
                unit: "Bộ",
                yearManufacture: 2019,
                yearUse: 2020,
                country: "Nhật Bản",
                brand: "Kobe Steel",
                model: "MKS-5000",
                capacity: "500A, 380V",
                status: "Đang sử dụng",
                demand: "Thường xuyên",
                note: "Dùng cho hàn ống lớn"
            },
            {
                id: 10,
                name: "Máy tiện CNC",
                serial: "CNC-2021-034",
                quantity: 2,
                unit: "Máy",
                yearManufacture: 2020,
                yearUse: 2021,
                country: "Đài Loan",
                brand: "Goodway",
                model: "GLS-200",
                capacity: "Ø500mm, 1000mm",
                status: "Không sử dụng",
                demand: "Cần bổ sung",
                note: "Cần đào tạo vận hành"
            }
        ];
    }

    // Get filtered and paginated data
    getPageData() {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        const end = start + this.rowsPerPage;
        return this.filteredData.slice(start, end);
    }

    // Get next available ID
    getNextId() {
        return Math.max(...this.equipmentData.map(e => e.id), 0) + 1;
    }

    // Get equipment by ID
    getById(id) {
        return this.equipmentData.find(e => e.id === id);
    }

    // Add new equipment
    addEquipment(data) {
        const newEquipment = {
            id: this.getNextId(),
            ...data
        };
        this.equipmentData.push(newEquipment);
        this.applyFilters();
        return newEquipment;
    }

    // Update equipment
    updateEquipment(id, data) {
        const index = this.equipmentData.findIndex(e => e.id === id);
        if (index !== -1) {
            this.equipmentData[index] = { ...this.equipmentData[index], ...data };
            this.applyFilters();
            return true;
        }
        return false;
    }

    // Delete equipment
    deleteEquipment(id) {
        this.equipmentData = this.equipmentData.filter(e => e.id !== id);
        this.selectedRows.delete(id);
        this.applyFilters();
    }

    // Delete multiple equipment
    deleteMultiple(ids) {
        this.equipmentData = this.equipmentData.filter(e => !ids.has(e.id));
        ids.forEach(id => this.selectedRows.delete(id));
        this.applyFilters();
    }

    // Apply filters
    applyFilters() {
        this.filteredData = this.equipmentData.filter(item => {
            let matches = true;

            // Search filter
            if (this.filters.search) {
                const searchLower = this.filters.search.toLowerCase();
                matches = matches && (
                    item.name.toLowerCase().includes(searchLower) ||
                    item.serial.toLowerCase().includes(searchLower) ||
                    (item.model && item.model.toLowerCase().includes(searchLower)) ||
                    (item.brand && item.brand.toLowerCase().includes(searchLower))
                );
            }

            // Status filter
            if (this.filters.status) {
                matches = matches && item.status === this.filters.status;
            }

            // Demand filter
            if (this.filters.demand) {
                matches = matches && item.demand === this.filters.demand;
            }

            // Year filter
            if (this.filters.year) {
                if (this.filters.year === 'older') {
                    matches = matches && item.yearUse < 2021;
                } else {
                    matches = matches && item.yearUse == this.filters.year;
                }
            }

            return matches;
        });

        // Apply sorting if active
        if (this.sortConfig.column) {
            this.applySorting();
        }

        // Reset to first page
        this.currentPage = 1;
    }

    // Apply sorting
    applySorting() {
        const { column, direction } = this.sortConfig;
        
        this.filteredData.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal ? bVal.toLowerCase() : '';
            }

            if (direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    }

    // Toggle sort
    toggleSort(column) {
        if (this.sortConfig.column === column) {
            this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortConfig.column = column;
            this.sortConfig.direction = 'asc';
        }
        this.applySorting();
    }

    // Calculate KPIs
    calculateKPIs() {
        return {
            total: this.equipmentData.length,
            active: this.equipmentData.filter(e => e.status === 'Đang sử dụng').length,
            idle: this.equipmentData.filter(e => e.status === 'Nhàn rỗi').length,
            broken: this.equipmentData.filter(e => e.status === 'Hỏng' || e.status === 'Không sử dụng').length,
            need: this.equipmentData.filter(e => e.demand === 'Cần bổ sung').length
        };
    }
}

// ====================================
// 2. UI RENDERER
// ====================================
class UIRenderer {
    constructor(store) {
        this.store = store;
    }

    // Render KPI cards
    renderKPIs() {
        const kpis = this.store.calculateKPIs();
        const kpiSection = document.getElementById('kpiSection');

        const kpiConfigs = [
            { key: 'total', title: 'Tổng số công cụ', icon: 'fa-toolbox', class: 'primary', desc: 'Tất cả thiết bị trong hệ thống' },
            { key: 'active', title: 'Đang sử dụng', icon: 'fa-check-circle', class: 'success', desc: `${((kpis.active/kpis.total)*100).toFixed(1)}% tổng số công cụ` },
            { key: 'idle', title: 'Nhàn rỗi', icon: 'fa-pause-circle', class: 'warning', desc: `${((kpis.idle/kpis.total)*100).toFixed(1)}% tổng số công cụ` },
            { key: 'broken', title: 'Hỏng / Không SD', icon: 'fa-exclamation-triangle', class: 'danger', desc: `${((kpis.broken/kpis.total)*100).toFixed(1)}% cần xử lý` },
            { key: 'need', title: 'Cần bổ sung', icon: 'fa-plus-circle', class: 'info', desc: 'Yêu cầu mua sắm mới' }
        ];

        kpiSection.innerHTML = kpiConfigs.map(config => `
            <div class="kpi-card ${config.class}">
                <div class="kpi-header">
                    <span class="kpi-title">${config.title}</span>
                    <div class="kpi-icon">
                        <i class="fas ${config.icon}"></i>
                    </div>
                </div>
                <div class="kpi-value">${kpis[config.key]}</div>
                <div class="kpi-change">${config.desc}</div>
            </div>
        `).join('');
    }

    // Render table
    renderTable() {
        const tbody = document.getElementById('tableBody');
        const pageData = this.store.getPageData();
        const start = (this.store.currentPage - 1) * this.store.rowsPerPage;

        if (pageData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="16" style="text-align: center; padding: 40px;">
                        <i class="fas fa-inbox" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
                        <p style="color: #999;">Không tìm thấy dữ liệu</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = pageData.map((item, index) => {
            const globalIndex = start + index;
            const isSelected = this.store.selectedRows.has(item.id);

            return `
                <tr class="${isSelected ? 'selected' : ''}" data-id="${item.id}">
                    <td class="checkbox-cell">
                        <input type="checkbox" ${isSelected ? 'checked' : ''} data-id="${item.id}" class="row-checkbox">
                    </td>
                    <td>${globalIndex + 1}</td>
                    <td>${this.escapeHtml(item.name)}</td>
                    <td><strong>${this.escapeHtml(item.serial)}</strong></td>
                    <td>${item.quantity}</td>
                    <td>${this.escapeHtml(item.unit)}</td>
                    <td>${item.yearManufacture || '-'}</td>
                    <td>${item.yearUse || '-'}</td>
                    <td>${this.escapeHtml(item.country) || '-'}</td>
                    <td>${this.escapeHtml(item.brand) || '-'}</td>
                    <td>${this.escapeHtml(item.model) || '-'}</td>
                    <td>${this.escapeHtml(item.capacity) || '-'}</td>
                    <td><span class="status-badge ${this.getStatusClass(item.status)}">${item.status}</span></td>
                    <td>${this.escapeHtml(item.demand) || '-'}</td>
                    <td>${this.escapeHtml(item.note) || '-'}</td>
                    <td>
                        <div class="action-icons">
                            <button class="icon-btn btn-view" data-id="${item.id}" title="Xem chi tiết">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="icon-btn btn-edit-row" data-id="${item.id}" title="Sửa">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="icon-btn delete btn-delete-row" data-id="${item.id}" title="Xóa">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Render pagination
    renderPagination() {
        const totalPages = Math.ceil(this.store.filteredData.length / this.store.rowsPerPage);
        const currentPage = this.store.currentPage;
        const pagination = document.getElementById('pagination');

        // Update info
        const start = (currentPage - 1) * this.store.rowsPerPage + 1;
        const end = Math.min(currentPage * this.store.rowsPerPage, this.store.filteredData.length);
        document.getElementById('showingStart').textContent = this.store.filteredData.length > 0 ? start : 0;
        document.getElementById('showingEnd').textContent = end;
        document.getElementById('totalRecords').textContent = this.store.filteredData.length;

        // Generate pagination buttons
        let buttons = [];
        
        // Previous button
        buttons.push(`
            <button ${currentPage === 1 ? 'disabled' : ''} data-page="prev">
                <i class="fas fa-chevron-left"></i>
            </button>
        `);

        // Page number buttons
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(`
                <button class="${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `);
        }

        // Next button
        buttons.push(`
            <button ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''} data-page="next">
                <i class="fas fa-chevron-right"></i>
            </button>
        `);

        pagination.innerHTML = buttons.join('');
    }

    // Update selection count
    updateSelectionUI() {
        const count = this.store.selectedRows.size;
        const countText = count === 0 ? 'Chưa chọn mục nào' : `Đã chọn ${count} mục`;
        document.getElementById('selectedCount').textContent = countText;
        
        document.getElementById('btnEdit').disabled = count !== 1;
        document.getElementById('btnDelete').disabled = count === 0;

        // Update select all checkbox
        const selectAll = document.getElementById('selectAll');
        const pageData = this.store.getPageData();
        const allPageSelected = pageData.length > 0 && pageData.every(item => this.store.selectedRows.has(item.id));
        selectAll.checked = allPageSelected;
    }

    // Helper: Get status class
    getStatusClass(status) {
        const mapping = {
            'Đang sử dụng': 'status-active',
            'Nhàn rỗi': 'status-idle',
            'Hỏng': 'status-broken',
            'Không sử dụng': 'status-broken',
            'Cần bổ sung': 'status-need'
        };
        return mapping[status] || 'status-idle';
    }

    // Helper: Escape HTML
    escapeHtml(text) {
        if (!text) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.toString().replace(/[&<>"']/g, m => map[m]);
    }

    // Full render
    render() {
        this.renderKPIs();
        this.renderTable();
        this.renderPagination();
        this.updateSelectionUI();
    }
}

// ====================================
// 3. PANEL MANAGER
// ====================================
class PanelManager {
    constructor(store, renderer) {
        this.store = store;
        this.renderer = renderer;
        this.panel = document.getElementById('slidePanel');
        this.overlay = document.getElementById('panelOverlay');
        this.form = document.getElementById('equipmentForm');
        this.title = document.getElementById('panelTitle');
    }

    open(mode, id = null) {
        this.store.panelMode = mode;
        this.store.currentEditId = id;
        
        this.form.reset();
        this.enableFormInputs();

        if (mode === 'add') {
            this.title.textContent = 'Thêm công cụ dụng cụ mới';
        } else if (mode === 'edit' || mode === 'view') {
            const item = id ? this.store.getById(id) : this.store.getById([...this.store.selectedRows][0]);
            
            if (item) {
                this.title.textContent = mode === 'edit' ? 'Sửa thông tin công cụ' : 'Xem chi tiết công cụ';
                this.populateForm(item);

                if (mode === 'view') {
                    this.disableFormInputs();
                }
            }
        }

        this.panel.classList.add('active');
        this.overlay.classList.add('active');
    }

    close() {
        this.panel.classList.remove('active');
        this.overlay.classList.remove('active');
        this.enableFormInputs();
    }

    populateForm(item) {
        const fields = ['name', 'serial', 'quantity', 'unit', 'yearManufacture', 'yearUse', 
                       'country', 'brand', 'model', 'capacity', 'status', 'demand', 'note'];
        
        fields.forEach(field => {
            const input = document.getElementById(`form${field.charAt(0).toUpperCase() + field.slice(1)}`);
            if (input) {
                input.value = item[field] || '';
            }
        });
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            // Convert number fields
            if (['quantity', 'yearManufacture', 'yearUse'].includes(key)) {
                data[key] = value ? parseInt(value) : null;
            } else {
                data[key] = value;
            }
        }
        
        return data;
    }

    save() {
        if (!this.form.checkValidity()) {
            this.form.reportValidity();
            return;
        }

        const formData = this.getFormData();

        if (this.store.currentEditId) {
            // Update
            this.store.updateEquipment(this.store.currentEditId, formData);
            this.showNotification('Cập nhật thành công!', 'success');
        } else {
            // Add new
            this.store.addEquipment(formData);
            this.showNotification('Thêm mới thành công!', 'success');
        }

        this.renderer.render();
        this.close();
    }

    disableFormInputs() {
        Array.from(this.form.elements).forEach(el => el.disabled = true);
    }

    enableFormInputs() {
        Array.from(this.form.elements).forEach(el => el.disabled = false);
    }

    showNotification(message, type = 'info') {
        alert(message); // Simple implementation, can be replaced with toast notifications
    }
}

// ====================================
// 4. EVENT HANDLER
// ====================================
class EventHandler {
    constructor(store, renderer, panelManager) {
        this.store = store;
        this.renderer = renderer;
        this.panelManager = panelManager;
        this.debounceTimer = null;
    }

    init() {
        this.attachSearchListeners();
        this.attachFilterListeners();
        this.attachTableListeners();
        this.attachActionBarListeners();
        this.attachPanelListeners();
        this.attachPaginationListeners();
    }

    // Search listeners
    attachSearchListeners() {
        const searchInput = document.getElementById('globalSearch');
        searchInput.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.store.filters.search = e.target.value;
                this.store.applyFilters();
                this.renderer.render();
            }, 300);
        });
    }

    // Filter listeners
    attachFilterListeners() {
        ['filterStatus', 'filterDemand', 'filterYear'].forEach(id => {
            const filterKey = id.replace('filter', '').toLowerCase();
            document.getElementById(id).addEventListener('change', (e) => {
                this.store.filters[filterKey] = e.target.value;
                this.store.applyFilters();
                this.renderer.render();
            });
        });
    }

    // Table listeners (Event Delegation)
    attachTableListeners() {
        const table = document.getElementById('equipmentTable');

        // Select all checkbox
        document.getElementById('selectAll').addEventListener('change', (e) => {
            const pageData = this.store.getPageData();
            if (e.target.checked) {
                pageData.forEach(item => this.store.selectedRows.add(item.id));
            } else {
                pageData.forEach(item => this.store.selectedRows.delete(item.id));
            }
            this.renderer.render();
        });

        // Table body - Event delegation
        const tbody = document.getElementById('tableBody');
        tbody.addEventListener('click', (e) => {
            const target = e.target.closest('button, input[type="checkbox"]');
            
            if (!target) {
                // Double click on row
                const row = e.target.closest('tr');
                if (row && row.dataset.id) {
                    this.panelManager.open('view', parseInt(row.dataset.id));
                }
                return;
            }

            const id = parseInt(target.dataset.id);

            // Checkbox
            if (target.classList.contains('row-checkbox')) {
                if (target.checked) {
                    this.store.selectedRows.add(id);
                } else {
                    this.store.selectedRows.delete(id);
                }
                this.renderer.render();
            }

            // View button
            if (target.classList.contains('btn-view') || target.closest('.btn-view')) {
                this.panelManager.open('view', id);
            }

            // Edit button
            if (target.classList.contains('btn-edit-row') || target.closest('.btn-edit-row')) {
                this.panelManager.open('edit', id);
            }

            // Delete button
            if (target.classList.contains('btn-delete-row') || target.closest('.btn-delete-row')) {
                if (confirm('Bạn có chắc chắn muốn xóa công cụ này?')) {
                    this.store.deleteEquipment(id);
                    this.renderer.render();
                }
            }
        });

        // Sort headers
        table.addEventListener('click', (e) => {
            const th = e.target.closest('th.sortable');
            if (th) {
                const column = th.dataset.column;
                this.store.toggleSort(column);
                this.renderer.render();
            }
        });
    }

    // Action bar listeners
    attachActionBarListeners() {
        document.getElementById('btnAdd').addEventListener('click', () => {
            this.panelManager.open('add');
        });

        document.getElementById('btnEdit').addEventListener('click', () => {
            if (this.store.selectedRows.size === 1) {
                this.panelManager.open('edit');
            }
        });

        document.getElementById('btnDelete').addEventListener('click', () => {
            if (this.store.selectedRows.size > 0) {
                if (confirm(`Bạn có chắc chắn muốn xóa ${this.store.selectedRows.size} công cụ đã chọn?`)) {
                    this.store.deleteMultiple(new Set(this.store.selectedRows));
                    this.renderer.render();
                }
            }
        });

        document.getElementById('btnExportExcel').addEventListener('click', () => {
            this.exportData('excel');
        });

        document.getElementById('btnExportPDF').addEventListener('click', () => {
            this.exportData('pdf');
        });
    }

    // Panel listeners
    attachPanelListeners() {
        document.getElementById('panelClose').addEventListener('click', () => {
            this.panelManager.close();
        });

        document.getElementById('panelOverlay').addEventListener('click', () => {
            this.panelManager.close();
        });

        document.getElementById('btnCancel').addEventListener('click', () => {
            this.panelManager.close();
        });

        document.getElementById('btnSave').addEventListener('click', () => {
            this.panelManager.save();
        });
    }

    // Pagination listeners
    attachPaginationListeners() {
        const pagination = document.getElementById('pagination');
        pagination.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn || btn.disabled) return;

            const page = btn.dataset.page;
            const totalPages = Math.ceil(this.store.filteredData.length / this.store.rowsPerPage);

            if (page === 'prev' && this.store.currentPage > 1) {
                this.store.currentPage--;
            } else if (page === 'next' && this.store.currentPage < totalPages) {
                this.store.currentPage++;
            } else if (!isNaN(page)) {
                this.store.currentPage = parseInt(page);
            }

            this.renderer.render();
        });
    }

    // Export functionality
    exportData(type) {
        alert(`Xuất dữ liệu sang ${type.toUpperCase()} - Chức năng đang phát triển`);
    }
}

// ====================================
// 5. APPLICATION INITIALIZATION
// ====================================
class EquipmentManagementApp {
    constructor() {
        this.store = new DataStore();
        this.renderer = new UIRenderer(this.store);
        this.panelManager = new PanelManager(this.store, this.renderer);
        this.eventHandler = new EventHandler(this.store, this.renderer, this.panelManager);
    }

    init() {
        this.renderer.render();
        this.eventHandler.init();
        console.log('Equipment Management System initialized successfully!');
    }
}

// ====================================
// START APPLICATION
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    const app = new EquipmentManagementApp();
    app.init();
});