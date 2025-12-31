/** * 1. قاعدة بيانات النظام الخبير (Knowledge Base)
 * تحتوي على الوجبات، السعرات، المغذيات الكبرى (Macros)، الصغرى (Micros)، والفوائد الصحية.
 */
const foodBank = [
    // وجبات الفطور
    { 
        name: "لبنة، زيتون، خبز أسمر", cals: 300, type: "breakfast",
        macros: "بروتين: 12g | كربوهيدرات: 40g | دهون: 10g", 
        micros: "كالسيوم، بروبيوتيك، فيتامين E",
        benefit: "تعزيز صحة الجهاز الهضمي وبناء العظام."
    },
    { 
        name: "بيض مسلوق وخضار ورقية", cals: 250, type: "breakfast",
        macros: "بروتين: 18g | كربوهيدرات: 5g | دهون: 15g", 
        micros: "فيتامين A، كولين، حديد",
        benefit: "تحسين التركيز الذهني وصحة الإبصار."
    },
    { 
        name: "حمص بالزيت وزيتون", cals: 400, type: "breakfast",
        macros: "بروتين: 15g | كربوهيدرات: 45g | دهون: 20g", 
        micros: "ألياف، مغنيسيوم، منغنيز",
        benefit: "إمداد الجسم بطاقة بطيئة الامتصاص طوال الصباح."
    },
    // وجبات الغداء
    { 
        name: "مقلوبة دجاج وسلطة", cals: 550, type: "lunch",
        macros: "بروتين: 35g | كربوهيدرات: 65g | دهون: 18g", 
        micros: "فيتامين B12، سيلينيوم، بوتاسيوم",
        benefit: "إمداد الجسم بالطاقة المستدامة وترميم العضلات."
    },
    { 
        name: "سمك مشوي وبطاطا مسلوقة", cals: 450, type: "lunch",
        macros: "بروتين: 30g | كربوهيدرات: 45g | دهون: 12g", 
        micros: "أوميغا 3، يود، فيتامين D",
        benefit: "دعم صحة القلب وتقوية الجهاز المناعي."
    },
    { 
        name: "صدر دجاج مع أرز أبيض", cals: 500, type: "lunch",
        macros: "بروتين: 40g | كربوهيدرات: 50g | دهون: 8g", 
        micros: "فيتامين B6، نياسين، زنك",
        benefit: "مثالي لبناء الكتلة العضلية وزيادة الاستقلاب."
    },
    // وجبات العشاء
    { 
        name: "شوربة عدس بالليمون", cals: 250, type: "dinner",
        macros: "بروتين: 15g | كربوهيدرات: 35g | دهون: 5g", 
        micros: "حمض الفوليك، مغنيسيوم، ألياف",
        benefit: "تنشيط الدورة الدموية وتحسين جودة الهضم."
    },
    { 
        name: "سلطة تونة وذرة", cals: 350, type: "dinner",
        macros: "بروتين: 25g | كربوهيدرات: 20g | دهون: 12g", 
        micros: "فيتامين E، أوميغا 3، سيلينيوم",
        benefit: "وجبة خفيفة غنية بالبروتين لدعم الاستشفاء الليلي."
    },
    { 
        name: "جبنة بيضاء مع خيار وطماطم", cals: 200, type: "dinner",
        macros: "بروتين: 14g | كربوهيدرات: 10g | دهون: 12g", 
        micros: "فوسفور، كالسيوم، فيتامين C",
        benefit: "ترطيب الجسم وتزويده بالمعادن الأساسية قبل النوم."
    }
];

/**
 * 2. محرك البحث الذكي (Matching Engine)
 * يقوم بترتيب الوجبات حسب الأقرب لسعرات المستخدم واختيار أفضل 3 خيارات.
 */
function getBestOptions(target, type) {
    return foodBank
        .filter(item => item.type === type)
        .sort((a, b) => Math.abs(a.cals - target) - Math.abs(b.cals - target))
        .slice(0, 3);
}

/**
 * 3. دالة معالجة البيانات الرئيسية (Core Logic)
 * تقوم بحساب البيانات الحيوية، تحديد الأهداف، وعرض النتائج.
 */
function processData() {
    // جلب المدخلات من واجهة المستخدم
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    // التحقق من اكتمال الحقول
    if (!weight || !height || !age) return alert("يرجى إدخال كافة البيانات بشكل صحيح");

    // العمليات الحسابية (BMI & BMR & Target)
    const bmi = weight / ((height/100)**2);
    const bmr = (gender === "male") ? (10*weight)+(6.25*height)-(5*age)+5 : (10*weight)+(6.25*height)-(5*age)-161;
    const target = Math.round((bmr * activity) - 500); // طرح 500 سعرة لخسارة الوزن

    // حساب توزيع الغرامات للمغذيات الكبرى (Macros) بناءً على الهدف
    const proteinGrams = Math.round(weight * 1.8); 
    const fatGrams = Math.round((target * 0.25) / 9);
    const carbGrams = Math.round((target - (proteinGrams * 4) - (fatGrams * 9)) / 4);

    // إظهار قسم النتائج
    document.getElementById('results').style.display = 'block';

    // عرض التحليل الحيوي والمغذيات المطلوبة
    document.getElementById('stats-summary').innerHTML = `
        <div class="meal-box" style="border:none; background: rgba(76, 175, 80, 0.1); text-align:right;">
            <h4 style="color:#4caf50; margin:0 0 10px 0;">📊 تحليل الاحتياج اليومي:</h4>
            <div style="font-size:0.9rem; line-height:1.7;">
                • مؤشر كتلة الجسم (BMI): <strong>${bmi.toFixed(1)}</strong><br>
                • السعرات المستهدفة: <strong>${target} سعرة</strong>
                <hr style="border:0; border-top:1px solid #333; margin:10px 0;">
                <strong>🥩 المغذيات الكبرى (الاحتياج اليومي):</strong><br>
                البروتين: ${proteinGrams}g | الكربوهيدرات: ${carbGrams}g | الدهون: ${fatGrams}g
                <br><br>
                <strong>🧪 توصية المغذيات الصغرى:</strong><br>
                الألياف: 25g | الماء: ${(weight*0.033).toFixed(1)} لتر | الصوديوم: < 2300mg
            </div>
        </div>
    `;

    // جلب خيارات الوجبات مقسمة حسب الفئات
    const categories = [
        { title: "خيارات الفطور (25%)", data: getBestOptions(target * 0.25, "breakfast") },
        { title: "خيارات الغداء (45%)", data: getBestOptions(target * 0.45, "lunch") },
        { title: "خيارات العشاء (30%)", data: getBestOptions(target * 0.30, "dinner") }
    ];

    // بناء واجهة عرض الوجبات
    let outputHTML = "";
    categories.forEach(cat => {
        outputHTML += `<div class="meal-box"><span class="category-label">${cat.title}</span>`;
        cat.data.forEach(meal => {
            outputHTML += `
                <div class="meal-item" style="flex-direction: column; align-items: flex-start; padding: 12px 0;">
                    <div style="display: flex; justify-content: space-between; width: 100%;">
                        <span class="meal-name" style="color:#4caf50; font-weight:bold;">${meal.name}</span>
                        <span class="meal-cals">${meal.cals} سعرة</span>
                    </div>
                    <div style="font-size: 0.8rem; color: #bbb; margin-top: 6px;">
                        <strong>📐 القيم:</strong> ${meal.macros} <br>
                        <strong>🔬 العناصر:</strong> ${meal.micros} <br>
                        <p style="color:#81c784; margin: 5px 0 0 0;">✨ <em>${meal.benefit}</em></p>
                    </div>
                </div>`;
        });
        outputHTML += `</div>`;
    });

    // حقن النتائج في الصفحة وتحريك الشاشة للأسفل
    document.getElementById('meal-output').innerHTML = outputHTML;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}