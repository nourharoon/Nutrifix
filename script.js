// 1. قاعدة بيانات الوجبات (Knowledge Base)
const mealsDatabase = [
    { name: "فطور: لبنة مع زيتون وخبز أسمر", calories: 300, type: "breakfast" },
    { name: "فطور: مسبحة (حمص) مع خضار ونصف رغيف", calories: 450, type: "breakfast" },
    { name: "غداء: مقلوبة دجاج (كمية معتدلة) مع سلطة", calories: 550, type: "lunch" },
    { name: "غداء: مجدرة برغل مع سلطة لبن وخيار", calories: 400, type: "lunch" },
    { name: "غداء: صينية خضار مع لحم مفروم وخبز", calories: 500, type: "lunch" },
    { name: "عشاء: جبنة بيضاء مع بطيخ أو خيار", calories: 200, type: "dinner" },
    { name: "عشاء: شوربة عدس دافئة", calories: 250, type: "dinner" }
];

// 2. دالة المحرك الذكي (KNN Logic) لإيجاد أقرب وجبة للسعرات المطلوبة
function getBestMeal(target, type) {
    let categoryMeals = mealsDatabase.filter(m => m.type === type);
    // خوارزمية البحث عن الأقرب
    return categoryMeals.reduce((prev, curr) => 
        Math.abs(curr.calories - target) < Math.abs(prev.calories - target) ? curr : prev
    );
}

// 3. الدالة الرئيسية التي تعمل عند الضغط على الزر
function calculate() {
    // جلب البيانات
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    if (!weight || !height || !age) {
        alert("يرجى إدخال كافة البيانات بشكل صحيح");
        return;
    }

    // حساب BMI
    const bmi = weight / ((height / 100) ** 2);
    let bmiCategory = (bmi < 18.5) ? "نحافة" : (bmi < 25) ? "وزن مثالي" : (bmi < 30) ? "زيادة وزن" : "سمنة";

    // حساب السعرات (Mifflin-St Jeor)
    let bmr = (gender === "male") 
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5 
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;
    
    const tdee = bmr * activity;
    const targetCalories = Math.round(tdee - 500); // هدف خسارة الوزن

    // --- استخدام المحرك الذكي هنا ---
    const lunchTarget = targetCalories * 0.4; // تخصيص 40% من السعرات للغداء
    const selectedLunch = getBestMeal(lunchTarget, "lunch");

    // --- منطق النصيحة الذكية (البدائل المحلية) ---
    let localAdvice = "";
    if (selectedLunch.name.includes("دجاج")) {
        localAdvice = "💡 نصيحة اقتصادية: يمكنك استبدال الدجاج بالعدس أو الحمص كمصدر بروتين أوفر سعراً.";
    } else if (selectedLunch.name.includes("مجدرة")) {
        localAdvice = "💡 نصيحة صحية: المجدرة بالبرغل أفضل لمرضى السكري من مجدرة الأرز.";
    } else {
        localAdvice = "💡 نصيحة: احرص على شرب كوبين من الماء قبل هذه الوجبة.";
    }

    // 4. عرض كل النتائج في الواجهة
    document.getElementById('results').style.display = 'block';
    
    document.getElementById('bmi-result').innerHTML = `
        <p class="result-item">مؤشر كتلة الجسم: <strong>${bmi.toFixed(1)}</strong> (${bmiCategory})</p>
    `;
    
    document.getElementById('calories-result').innerHTML = `
        <p class="result-item">سعرات الثبات: <strong>${Math.round(tdee)}</strong> سعرة</p>
        <p class="result-item" style="color:#e67e22;">لهدف خسارة الوزن تناول: <strong>${targetCalories}</strong> سعرة</p>
    `;

    document.getElementById('meal-plan').innerHTML = `
        <hr>
        <h3 style="color:#27ae60;">توصية النظام الخبير (KNN Matching):</h3>
        <p class="result-item">أفضل وجبة غداء مناسبة لاحتياجك هي:<br> 
        <strong>${selectedLunch.name}</strong> (${selectedLunch.calories} سعرة)</p>
        <div style="font-size: 14px; color: #16a085; background: #e0f2f1; padding: 15px; border-radius: 8px; margin-top:10px;">
            ${localAdvice}
        </div>
    `;
}