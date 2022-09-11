<template>
  <div>
    <h2>카카오 맵 보기</h2>
    <div id="map"></div>
  </div>
</template>
<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
<script>
export default {
  components: {},
  data() {
    return {
      // map 객체 설정
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
      // 없다면 카카오 스크립트 추가 후 맵 실행
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
    }
  }
}
</script>
