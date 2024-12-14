const areas = {
    cairo: ["مدينة نصر", "الزمالك", "المعادي", "الهرم"],
    giza: ["6 أكتوبر", "الشيخ زايد", "الهرم", "الدقي"],
    alexandria: ["منتزه", "محرم بك", "سيدي بشر", "سموحة"]
};

export function updateAreas() {
    const governorate = document.getElementById("governorate").value;
    const areaSelect = document.getElementById("area");
    
    // تفريغ الخيارات السابقة
    areaSelect.innerHTML = "<option value=''>اختر منطقة</option>";

    if (governorate) {
        const areaList = areas[governorate];
        areaList.forEach(area => {
            const option = document.createElement("option");
            option.value = area;
            option.textContent = area;
            areaSelect.appendChild(option);
        });
    }
}