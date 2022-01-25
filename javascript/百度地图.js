//多个地图完整版
export function initMap({center, position, layer, zoom, zooms, show3D} = {show3D: true}) {
    return new Promise((resolve => {
      AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
        // 天地图
        var layerCtrl1 = new BasicControl.LayerSwitcher({
          position: position || 'lt', //默认左上角
          baseLayers: [{
            id: 'tianditile',
            name: '标准图',
            layer: new AMap.TileLayer({
              getTileUrl: 'http://t{0,1,2,3,4,5,6,7}.tianditu.gov.cn/DataServer?T=vec_w&tk=cfbba9e64fe67f705c9e4ba1f7df20f3&x=[x]&y=[y]&l=[z]',
            })
          },
            {
              enable: true,
              id: 'tianditu',
              name: '卫星图',
              layer: new AMap.TileLayer({
                getTileUrl: 'http://t{0,1,2,3,4,5,6,7}.tianditu.gov.cn/DataServer?T=img_w&tk=cfbba9e64fe67f705c9e4ba1f7df20f3&x=[x]&y=[y]&l=[z]',
              })
          }],
          overlayLayers: [
            {
              id: 'traffic',
              enable: false,
              name: '路网图',
              layer: new AMap.TileLayer({
                getTileUrl: 'http://t{0,1,2,3,4,5,6,7}.tianditu.gov.cn/DataServer?T=cia_w&x=[x]&y=[y]&l=[z]&tk=cfbba9e64fe67f705c9e4ba1f7df20f3',
                zIndex: 10,
              })
            },
          ]
        });
  
  
        const TDLuWang = [
          new AMap.TileLayer({
            getTileUrl: 'http://t{0,1,2,3,4,5,6,7}.tianditu.gov.cn/DataServer?T=img_w&tk=cfbba9e64fe67f705c9e4ba1f7df20f3&x=[x]&y=[y]&l=[z]',
          }), new AMap.TileLayer({
            getTileUrl: 'http://t{0,1,2,3,4,5,6,7}.tianditu.gov.cn/DataServer?T=cia_w&x=[x]&y=[y]&l=[z]&tk=cfbba9e64fe67f705c9e4ba1f7df20f3',
            zIndex: 10,
          })
        ];
  
  
        // 高德地图
        var layerCtrl2 = new BasicControl.LayerSwitcher({
          position: position || 'lt', //默认左上角
        })
  
  
        // 图层
        const mapLayer = {
          tianditu: layerCtrl1,
          gaode:layerCtrl2,
          TDLuWang: TDLuWang
        }
   
        let map = new AMap.Map('container', {
          //这里将layerCtrl中启用的图层传递给map
          layers: layer === 'TDLuWang' ? TDLuWang : mapLayer[layer || 'tianditu'].getEnabledLayers(),
          center: center || [110.573441, 19.95186],
          zooms: zooms || [3, 18],
          zoom: zoom || 13,
          viewMode: '3D',
          pitch: 10,
          rotateEnable:true,
          pitchEnable:true,
          rotation: -15,
        });
        map.addControl(mapLayer[layer || 'tianditu']);
        if (show3D) {
          var controlBar = new AMap.ControlBar({
            position:{
              left: '-88px',
              top: '73px',
            },
            showZoomBar: false
          });
          map.addControl(controlBar);
        }
        resolve(map)
      })
    }))
  }

//   单个地图简易版
export function initMap({center, position, layer, zoom, zooms, show3D} = {show3D: true}) {
    return new Promise((resolve => {
      AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
        // 高德地图
        var layerCtrl2 = new BasicControl.LayerSwitcher({
          position: position || 'lt', //默认左上角
        })
  
        let map = new AMap.Map('container', {
          //这里将layerCtrl中启用的图层传递给map
          layers: layerCtrl2.getEnabledLayers(),
          center: center || [110.573441, 19.95186],
          zooms: zooms || [3, 18],
          zoom: zoom || 13,
          viewMode: '3D',
          pitch: 10,
          rotateEnable:true,
          pitchEnable:true,
          rotation: -15,
        });
        map.addControl(mapLayer[layer || 'tianditu']);
        if (show3D) {
          var controlBar = new AMap.ControlBar({
            position:{
              left: '-88px',
              top: '73px',
            },
            showZoomBar: false
          });
          map.addControl(controlBar);
        }
        resolve(map)
      })
    }))
  }



//   引用
this.map = await initMap({layer: 'TDLuWang', show3D: false, center: location})