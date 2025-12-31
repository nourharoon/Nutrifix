// 1. قاعدة بيانات الوجبات الموسعة (Knowledge Base)
// أضفنا وجبات بسعرات عالية لتناسب خيار "النشاط العالي"
const mealsDatabase = [
    { name: "فطور: لبنة مع زيتون وخبز أسمر", calories: 300, type: "breakfast" },
    { name: "فطور: مسبحة (حمص) مع خضار ونصف رغيف", calories: 450, type: "breakfast" },
    { name: "فطور رياضي: 3 بيضات مع شوفان وموز", calories: 600, type: "breakfast" },
    { name: "غداء: مقلوبة دجاج (كمية معتدلة) مع سلطة", calories: 550, type: "lunch" },
    { name: "غداء: مجدرة برغل مع سلطة لبن وخيار", calories: 400, type: "lunch" },
    { name: "غداء: صينية خضار مع لحم مفروم وخبز", calories: 500, type: "lunch" },
    { name: "غداء رياضي: صدر دجاج مضاعف مع باستا ومكسرات", calories: 850, type: "lunch" },
    { name: "غداء شاق: ستيك لحم بقري مع بطاطس مهروسة وزبدة", calories: 750, type: "lunch" },
    { name: "عشاء: جبنة بيضاء مع بطيخ أو خيار", calories: 200, type: "dinner" },
    { name: "عشاء: شوربة عدس دافئة", calories: 250, type: "dinner" },
    { name: "عشاء رياضي: تونة مع سلطة وبطاطس مسلوقة", calories: 400, type: "dinner" }
];

// 2. محرك التوصية الذكي (KNN Logic)
// يبحث عن الوجبة الأقرب لسعرات المستخدم المستهدفة
function getBestMeal(target, type) {
    let categoryMeals = mealsDatabase.filter(m => m.type === type);
    return categoryMeals.reduce((prev, curr) => 
        Math.abs(curr.calories - target) < Math.abs(prev.calories - target) ? curr : prev
    );
}

// 3. الدالة الرئيسية للحساب والعرض
function calculate() {
    // جلب المدخلات
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    // التحقق من صحة البيانات
    if (!weight || !height || !age) {
        alert("يرجى إدخال كافة البيانات بشكل صحيح");
        return;
    }

    // أولاً: حساب مؤشر كتلة الجسم (BMI)
    const bmi = weight / ((height / 100) ** 2);
    let bmiCategory = (bmi < 18.5) ? "نحافة" : (bmi < 25) ? "وزن مثالي" : (bmi < 30) ? "زيادة وزن" : "سمنة";

    // ثانياً: حساب السعرات (Mifflin-St Jeor)
    let bmr = (gender === "male") 
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5 
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;
    
    const tdee = bmr * activity; // سعرات الثبات بناءً على مستوى النشاط
    const targetCalories = Math.round(tdee - 500); // هدف خسارة الوزن الافتراضي

    // ثالثاً: اختيار الوجبات بناءً على السعرات الناتجة (توزيع 40% للغداء)
    const lunchTarget = targetCalories * 0.4;
    const selectedLunch = getBestMeal(lunchTarget, "lunch");

    // رابعاً: نظام النصائح الذكي (Expert Rules)
    let localAdvice = "";
    if (activity >= 1.725) {
        localAdvice = "💡 نصيحة للرياضيين: بما أن نشاطك عالٍ، ركز على تناول البروتين مباشرة بعد تمرينك لترميم العضلات.";
    } else if (selectedLunch.name.includes("دجاج")) {
        localAdvice = "💡 نصيحة اقتصادية: يمكنك استبدال الدجاج بالعدس أو الفول كمصدر بروتين نباتي أرخص ثمناً.";
    } else if (bmi > 25) {
        localAdvice = "💡 نصيحة صحية: حاول المشي لمدة 20 دقيقة بعد وجبة الغداء للمساعدة في حرق السعرات.";
    } else {
        localAdvice = "💡 نصيحة: استبدل الخبز الأبيض بالخبز الأسمر لزيادة الشعور بالشبع لفترة أطول.";
    }

    // خامساً: إظهار النتائج في الصفحة
    document.getElementById('results').style.display = 'block';
    
    document.getElementById('bmi-result').innerHTML = `
        <p class="result-item">مؤشر كتلة الجسم: <strong>${bmi.toFixed(1)}</strong> (${bmiCategory})</p>
    `;
    
    document.getElementById('calories-result').innerHTML = `
        <p class="result-item">سعرات الثبات اليومية: <strong>${Math.round(tdee)}</strong> سعرة</p>
        <p class="result-item" style="color:#e67e22;">لهدف خسارة الوزن (صحياً): <strong>${targetCalories}</strong> سعرة</p>
    `;

    document.getElementById('meal-plan').innerHTML = `
        <hr>
        <h3 style="color:#27ae60;">توصية النظام الخبير (KNN Matching):</h3>
        <p class="result-item">أفضل وجبة غداء مناسبة لاحتياجك هي:<br> 
        <strong>${selectedLunch.name}</strong> (${selectedLunch.calories} سعرة)</p>
        <div style="font-size: 14px; color: #16a085; background: #e0f2f1; padding: 15px; border-radius: 8px; margin-top:10px; text-align:right;">
            ${localAdvice}
        </div>
    `;

    // تمرير الشاشة تلقائياً للنتائج
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}