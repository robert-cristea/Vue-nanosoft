<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">Satellite Map</h4>
          </div>
        </md-card-header>
        <md-card-content>
          <div class="card-text">
            <div id="satelliteMap" class="map map-big"></div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">Regular Map</h4>
          </div>
        </md-card-header>
        <md-card-content>
          <div id="regularMap" class="map"></div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-text md-card-header-green">
          <div class="card-text">
            <h4 class="title">Custom Skin & Settings Map</h4>
          </div>
        </md-card-header>
        <md-card-content>
          <div id="customSkinMap" class="map"></div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import { API_KEY } from "./API_KEY";
import { Loader, LoaderOptions } from "google-maps";

const loader = new Loader(API_KEY);

export default {
  mounted() {
    loader.load().then(function(google) {
      // Satellite Map Begin
      const myLatlng = new window.google.maps.LatLng(40.748817, -73.985428);
      const mapOptions = {
        zoom: 3,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
        center: myLatlng,
        mapTypeId: window.google.maps.MapTypeId.SATELLITE
      };

      const map = new window.google.maps.Map(
        document.getElementById("satelliteMap"),
        mapOptions
      );

      const marker = new window.google.maps.Marker({
        position: myLatlng,
        title: "Satellite Map!"
      });
      marker.setMap(map);
      // Satellite Map End

      // Regular Map Begin
      const myLatlng1 = new window.google.maps.LatLng(40.748817, -73.985428);
      const mapOptions1 = {
        zoom: 8,
        center: myLatlng1,
        scrollwheel: false // we disable de scroll over the map, it is a really annoing when you scroll through page
      };

      const map1 = new window.google.maps.Map(
        document.getElementById("regularMap"),
        mapOptions1
      );

      const marker1 = new window.google.maps.Marker({
        position: myLatlng1,
        title: "Regular Map!"
      });

      marker1.setMap(map);
      // Regular Map End

      // Custom Skin & Settings Map Begin
      const myLatlng2 = new google.maps.LatLng(40.748817, -73.985428);
      const mapOptions2 = {
        zoom: 13,
        center: myLatlng2,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
        disableDefaultUI: true, // a way to quickly hide all controls
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      };

      const map2 = new google.maps.Map(
        document.getElementById("customSkinMap"),
        mapOptions2
      );

      const marker2 = new google.maps.Marker({
        position: myLatlng2,
        title: "Custom Skin & Settings Map!"
      });

      marker2.setMap(map);
      // Custom Skin & Settings Map End
    });
  }
};
</script>
<style lang="scss">
.card-map {
  min-height: 350px;
  .map {
    height: 300px;
    width: 100%;
  }
}
</style>
