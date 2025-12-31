/**
 * 1. قاعدة البيانات المدمجة (Internal Knowledge Base)
 * تضمن عمل الموقع مباشرة دون الحاجة لطلبات خارجية.
 */
const foodBank = [
    { 
        name: "لبنة، زيتون، خبز أسمر", 
        amount: "3 ملاعق لبنة، 5 حبات زيتون، رغيف خبز أسمر صغير",
        cals: 300, type: "breakfast",
        macros: "بروتين: 12g | كربوهيدرات: 40g | دهون: 10g", 
        micros: "كالسيوم، بروبيوتيك، فيتامين E",
        benefit: "تعزيز صحة الجهاز الهضمي وبناء العظام."
    },
    { 
        name: "بيض مسلوق وخضار ورقية", 
        amount: "بيضتان مسلوقتان، كوب جرجير، حبة طماطم",
        cals: 250, type: "breakfast",
        macros: "بروتين: 18g | كربوهيدرات: 5g | دهون: 15g", 
        micros: "فيتامين A، كولين، حديد",
        benefit: "تحسين التركيز الذهني وصحة الإبصار."
    },
    { 
        name: "حمص بالزيت وزيتون", 
        amount: "5 ملاعق حمص، 1 ملعقة زيت زيتون، نصف رغيف أسمر",
        cals: 400, type: "breakfast",
        macros: "بروتين: 15g | كربوهيدرات: 45g | دهون: 20g", 
        micros: "ألياف، مغنيسيوم، منغنيز",
        benefit: "إمداد الجسم بطاقة بطيئة الامتصاص طوال الصباح."
    },
    { 
        name: "مقلوبة دجاج وسلطة", 
        amount: "150غ صدر دجاج، 6 ملاعق أرز، كوب سلطة خضراء",
        cals: 550, type: "lunch",
        macros: "بروتين: 35g | كربوهيدرات: 65g | دهون: 18g", 
        micros: "فيتامين B12، سيلينيوم، بوتاسيوم",
        benefit: "إمداد الجسم بالطاقة المستدامة وترميم العضلات."
    },
    { 
        name: "سمك مشوي وبطاطا مسلوقة", 
        amount: "200غ سمك فيليه، حبة بطاطا متوسطة، ليمون",
        cals: 450, type: "lunch",
        macros: "بروتين: 30g | كربوهيدرات: 45g | دهون: 12g", 
        micros: "أوميغا 3، يود، فيتامين D",
        benefit: "دعم صحة القلب وتقوية الجهاز المناعي."
    },
    { 
        name: "صدر دجاج مع أرز أبيض", 
        amount: "200غ صدر دجاج مشوي، 5 ملاعق أرز، نصف كوب لبن",
        cals: 500, type: "lunch",
        macros: "بروتين: 40g | كربوهيدرات: 50g | دهون: 8g", 
        micros: "فيتامين B6، نياسين، زنك",
        benefit: "مثالي لبناء الكتلة العضلية وزيادة الاستقلاب."
    },
    { 
        name: "شوربة عدس بالليمون", 
        amount: "زبدية كبيرة (300 مل)، شريحة توست محمص واحدة",
        cals: 250, type: "dinner",
        macros: "بروتين: 15g | كربوهيدرات: 35g | دهون: 5g", 
        micros: "حمض الفوليك، مغنيسيوم، ألياف",
        benefit: "تنشيط الدورة الدموية وتحسين جودة الهضم."
    },
    { 
        name: "سلطة تونة وذرة", 
        amount: "علبة تونة مصفاة، 3 ملاعق ذرة، خس وفلفل بارد",
        cals: 350, type: "dinner",
        macros: "بروتين: 25g | كربوهيدرات: 20g | دهون: 12g", 
        micros: "فيتامين E، أوميغا 3، سيلينيوم",
        benefit: "وجبة خفيفة غنية بالبروتين لدعم الاستشفاء الليلي."
    },
    { 
        name: "جبنة بيضاء مع خيار وطماطم", 
        amount: "60غ جبنة قليلة الدسم، حبتان خيار، ربع رغيف أسمر",
        cals: 200, type: "dinner",
        macros: "بروتين: 14g | كربوهيدرات: 10g | دهون: 12g", 
        micros: "فوسفور، كالسيوم، فيتامين C",
        benefit: "ترطيب الجسم وتزويده بالمعادن الأساسية قبل النوم."
    }
];

/**
 * 2. محرك الاختيار (Filtering & Sorting Engine)
 */
function getBestOptions(target, type) {
    return foodBank
        .filter(item => item.type === type)
        .sort((a, b) => Math.abs(a.cals - target) - Math.abs(b.cals - target))
        .slice(0, 3);
}

/**
 * 3. المعالجة وعرض التقارير
 */
function processData() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    if (!weight || !height || !age) return alert("يرجى إدخال كافة البيانات بشكل صحيح");

    const bmi = weight / ((height/100)**2);
    const bmr = (gender === "male") ? (10*weight)+(6.25*height)-(5*age)+5 : (10*weight)+(6.25*height)-(5*age)-161;
    const target = Math.round((bmr * activity) - 500);

    const proteinGrams = Math.round(weight * 1.8); 
    const fatGrams = Math.round((target * 0.25) / 9);
    const carbGrams = Math.round((target - (proteinGrams * 4) - (fatGrams * 9)) / 4);

    document.getElementById('results').style.display = 'block';

    document.getElementById('stats-summary').innerHTML = `
        <div class="meal-box" style="border:none; background: rgba(76, 175, 80, 0.1); text-align:right;">
            <h4 style="color:#4caf50; margin:0 0 10px 0;">📊 التقرير الحيوي المستخلص:</h4>
            <div style="font-size:0.9rem; line-height:1.7;">
                • مؤشر كتلة الجسم (BMI): <strong>${bmi.toFixed(1)}</strong><br>
                • الاحتياج اليومي المستهدف: <strong>${target} سعرة</strong>
                <hr style="border:0; border-top:1px solid #333; margin:10px 0;">
                <strong>🥩 توزيع المغذيات الكبرى:</strong><br>
                البروتين: ${proteinGrams}g | الكربوهيدرات: ${carbGrams}g | الدهون: ${fatGrams}g
            </div>
        </div>
    `;

    const categories = [
        { title: "🍳 مقترحات الفطور (25%)", data: getBestOptions(target * 0.25, "breakfast") },
        { title: "🍱 مقترحات الغداء (45%)", data: getBestOptions(target * 0.45, "lunch") },
        { title: "🥗 مقترحات العشاء (30%)", data: getBestOptions(target * 0.30, "dinner") }
    ];

    let outputHTML = "";
    categories.forEach(cat => {
        outputHTML += `<div class="meal-box"><span class="category-label">${cat.title}</span>`;
        cat.data.forEach(meal => {
            outputHTML += `
                <div class="meal-item">
                    <div style="display: flex; justify-content: space-between; width: 100%;">
                        <span style="color:#4caf50; font-weight:bold;">${meal.name}</span>
                        <span style="color:var(--primary); font-size:0.85rem;">${meal.cals} سعرة</span>
                    </div>
                    <div style="font-size: 0.85rem; color: #fff; margin: 8px 0; background: #333; padding: 6px; border-radius: 5px;">
                        <strong>⚖️ الكمية:</strong> ${meal.amount}
                    </div>
                    <div style="font-size: 0.8rem; color: #bbb;">
                        <strong>📐 المغذيات:</strong> ${meal.macros} <br>
                        <strong>🔬 العناصر:</strong> ${meal.micros} <br>
                        <p style="color:#81c784; margin: 5px 0 0 0;">✨ <em>${meal.benefit}</em></p>
                    </div>
                </div>`;
        });
        outputHTML += `</div>`;
    });

    document.getElementById('meal-output').innerHTML = outputHTML;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}