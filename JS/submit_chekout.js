document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form_contact");
    const addressInput = document.getElementById("Address");
    const subtotalPriceElement = document.querySelector(".subtotal_chekout");
    const servicePriceElement = document.querySelector(".service_price");
    const finalTotalPriceElement = document.querySelector(".total_chekout");

    // حقل الإدخال المخفي الجديد
    const serviceChargeInput = document.getElementById("service_charge_input");

    // دالة لحساب رسوم التوصيل بناءً على العنوان
    function getDeliveryFee(address) {
        if (address.includes("منطي")) {
            return 10;
        } else if (address.includes("بيجام")) {
            return 15;
        } else if (address.includes("ارض الحافي")) {
            return 8;
        } else if (address.includes("ميت")) {
            return 15;
        } else {
            return 0; // سعر افتراضي
        }
    }

    // دالة لتحديث السعر النهائي
    window.updateFinalPrice = function() {
        const subtotalText = subtotalPriceElement.textContent.replace('$', '').trim();
        const subtotal = parseFloat(subtotalText);

        if (isNaN(subtotal)) {
            console.error("Error: Subtotal price is not a valid number.");
            return;
        }

        const deliveryFee = getDeliveryFee(addressInput.value);
        const finalTotal = subtotal + deliveryFee;

        servicePriceElement.textContent = `$ ${deliveryFee.toFixed(2)}`;
        finalTotalPriceElement.textContent = `$ ${finalTotal.toFixed(2)}`;

        // إضافة قيمة رسوم الخدمة إلى الحقل المخفي
        if (serviceChargeInput) {
            serviceChargeInput.value = deliveryFee;
        }
    }

    // استدعاء الدالة عند تحميل الصفحة
    updateFinalPrice();

    // الاستماع لأي تغيير في حقل العنوان لتحديث السعر
    addressInput.addEventListener('input', updateFinalPrice);

    // معالج حدث إرسال النموذج
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // منع الإرسال الافتراضي

        const scriptURL = "https://script.google.com/macros/s/AKfycbydRKKhXxTioosjIKqrsgURCDYGxBOgoipD3dtOQ1vj2CNeAVaxAcFYbj7lPPOIG_p8/exec";

        fetch(scriptURL, {
            method: "POST",
            body: new FormData(form),
        })
        .then(() => {
            // تفريغ السلة وإعادة تحميل الصفحة بعد تأخير بسيط
            setTimeout(() => {
                localStorage.removeItem("cart");
                alert('تم إتمام الطلب بنجاح!');
                window.location.reload();
            }, 1000);
        })
        .catch((error) => console.error("Error!", error.message));
    });
});
