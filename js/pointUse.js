const $myPoint = document.getElementById("myPoint"),
  $orderAmt = document.getElementById("orderAmt"),
  $inquiryPoint = document.getElementById("inquiryPoint"),
  $useMinPoint = document.getElementById("useMinPoint"),
  $useMaxPoint = document.getElementById("useMaxPoint"),
  $useUnitPoint = document.getElementById("useUnitPoint"),
  $usePoint = document.getElementById("usePoint"),
  $total = document.getElementById("total");

// cors 에러 방지를 위해 임시로 https://cors-anywhere.herokuapp.com 삽입
const url =
  "https://cors-anywhere.herokuapp.com/https://test-menu.payco.kr/test/api";

const scope = {
  functions: {
    getWorkPoint: async () => {
      try {
        let $select_point_type = document.getElementById("select_point_type");

        if ($select_point_type.value === "") {
          $select_point_type.focus();
          throw new Error("조회 type을 선택해주세요");
        }

        const res = await axios.post(`${url}/work/point`, {
          type: $select_point_type.value,
        });

        if (res.data.status !== 0) {
          throw new Error(res.data.message);
        }

        $orderAmt.innerHTML = res.data.result.orderAmt;
        $myPoint.innerHTML = res.data.result.myPoint;
        $inquiryPoint.value = res.data.result.useMaxPoint;
        $useMaxPoint.value = res.data.result.useMaxPoint;
        $useMinPoint.value = res.data.result.useUnitPoint;
        $useUnitPoint.value = res.data.result.useUnitPoint;

        console.log(res.data);
      } catch (error) {
        alert(error);
      }
    },
    getPointUse: () => {
      if ($inquiryPoint.value % $useUnitPoint.value !== 0) {
        alert(`적립포인트단위는 ${$useUnitPoint.value}입니다.`);
        $inquiryPoint.focus();
      }

      if (
        $inquiryPoint.value > $useMaxPoint.value ||
        $inquiryPoint.value < $useMinPoint.value
      ) {
        alert("포인트 사용범위를 확인하세요");
        $inquiryPoint.focus();
      }

      $usePoint.innerHTML = $inquiryPoint.value;
      $total.innerHTML = $orderAmt.textContent - $inquiryPoint.value;
    },
  },
};

window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#btn_getWorkPoint")
    .addEventListener("click", scope.functions.getWorkPoint);
  document
    .getElementById("point-input-btn")
    .addEventListener("click", scope.functions.getPointUse);
});
