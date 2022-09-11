<template>
  <div class="mt-2">
    <div id="map" style="width: 500px; height: 400px"></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      map: null
    }
  },
  setup() {},
  created() {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      // 카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
      this.loadMap()
    } else {
      this.loadScript()
    }
  },
  unmounted() {},
  methods: {
    loadScript() {
      const script = document.createElement('script')
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=b7378d7155a075f129d4cfeb94bf41d3&autoload=false' // &autoload=false 로드가 실행된 다음에 맵을 그리는 함수가 실행되도록..
      script.onload = () => window.kakao.maps.load(this.loadMap) // 스크립트 로드가 끝나면 지도를 실행될 준비가 되어 있다면 지도가 실행되도록

      document.head.appendChild(script)
    },
    loadMap() {
      const container = document.getElementById('map') // 지도를 담을 영역의 DOM 레퍼런스
      const options = {
        // 지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
        level: 3 // 지도의 레벨(확대, 축소 정도)
      }

      this.map = new window.kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴
      this.loadMaker()
    },
    loadMaker() {
      // 마커가 표시될 위치입니다
      const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667)

      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      })

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map)
    }
  }
}
/* 23.Vue.js 카카오 Maps API : https://apis.map.kakao.com/
  - https://apis.map.kakao.com/web/guide/에서 가이드를 알려줌

  * 카카오 Maps API 사용하기
  1. 내 애플리케이션 등록
  2, 플랫폼 > 웹 플랫폼 등록
  3. 사용하기 위한 소스 받아오기 : mounted 단계에서 daum객체가 없을 경우, 스크립트 태그 생성 및 head에 추가, 없으면 지도를 로드하는 loadScript() 항수 실행
    - 로그인은 수시로 필요해 index.html에 sdk소스를 걸었지만, 특정페이지에서만 필요한 우편펀호나 지도는 그럴필요가 없기에 없으면 스크립트 태그를 생성해 삽입할 수 있도록 한다.
  4. 원하는 위치에 마커 찍기 실행 loadMaker(), 필요한 옵션은 예제를 보면서 만들어보자.
  ** js예제들을 vue에 맞게 적용할 수 있는 방법을 생각해 작성해보자.
*/
</script>
