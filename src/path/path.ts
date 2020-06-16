// for chart

const chart = (from: Date, to: Date) => `
              (
                embeddableConfig:(timeRange:(from:'${new Date().toISOString()}',to:now)),
                gridData:(h:8,i:'76452f72-462c-4f95-95b7-8bb5c6724896',w:12,x:0,y:0),
                id:dab27040-99e1-11ea-9ddb-05a3689f3e14,
                panelIndex:'76452f72-462c-4f95-95b7-8bb5c6724896',
                type:visualization,version:'7.6.1'
              ),
              (
                embeddableConfig:(
                  timeRange:(from:'${from.toISOString()}',to:'${to.toISOString()}')
                ),
                gridData:(h:8,i:'4b770ccd-2cff-422a-a3f3-5350393a8c89',w:12,x:12,y:0),
                id:'5a7df240-99e7-11ea-9ddb-05a3689f3e14',
                panelIndex:'4b770ccd-2cff-422a-a3f3-5350393a8c89',
                type:visualization,version:'7.6.1'
              ),
              (
                embeddableConfig:(timeRange:(from:'${(new Date()).toISOString()}',to:now)),
                gridData:(h:8,i:b3503603-04f5-4bda-863c-c19a105edb06,w:12,x:24,y:0),
                id:'8b57bea0-99e7-11ea-9ddb-05a3689f3e14',
                panelIndex:b3503603-04f5-4bda-863c-c19a105edb06,
                type:visualization,version:'7.6.1'
              ),
              (
                embeddableConfig:(
                  timeRange:(from:'${from.toISOString()}',to:'${to.toISOString()}')),
                gridData:(h:8,i:'46a0686f-bf09-450b-8bd1-25e92daf0859',w:12,x:36,y:0),
                id:ac5554f0-99e7-11ea-9ddb-05a3689f3e14,
                panelIndex:'46a0686f-bf09-450b-8bd1-25e92daf0859',
                type:visualization,
                version:'7.6.1'
              ),
              (
                embeddableConfig:(timeRange:(from:'${(new Date()).toISOString()}',to:now)),
                gridData:(h:9,i:'3ddd5a40-5c81-4856-aebe-2d606d371446',w:24,x:0,y:8),
                id:fd0984e0-6885-11ea-b305-a30961cbafb1,
                panelIndex:'3ddd5a40-5c81-4856-aebe-2d606d371446',
                type:visualization,
                version:'7.6.1'
              ),
              (
                embeddableConfig:(
                  timeRange:(from:'${from.toISOString()}',to:'${to.toISOString()}')),
                gridData:(h:9,i:ffcfced6-ee7d-4abc-a314-27542cb03c31,w:24,x:24,y:8),
                id:fd0984e0-6885-11ea-b305-a30961cbafb1,
                panelIndex:ffcfced6-ee7d-4abc-a314-27542cb03c31,
                type:visualization,version:'7.6.1'),
              (
                embeddableConfig:(timeRange:(from:'${(new Date()).toISOString()}',to:now)),
                gridData:(h:15,i:'066898de-49c6-45fa-af07-025788143a10',w:24,x:0,y:17),
                id:fbadfea0-63c6-11ea-9f43-d5197eb32b78,panelIndex:'066898de-49c6-45fa-af07-025788143a10',
                type:visualization,version:'7.6.1'
              ),
              (
                embeddableConfig:(
                  timeRange:(from:'${from.toISOString()}',to:'${to.toISOString()}')),
                gridData:(h:15,i:feb5c6f7-aac6-477a-87c3-e7cb9e637e87,w:24,x:24,y:17),
                id:fbadfea0-63c6-11ea-9f43-d5197eb32b78,
                panelIndex:feb5c6f7-aac6-477a-87c3-e7cb9e637e87,
                type:visualization,version:'7.6.1'
              ),
              (
                embeddableConfig:(timeRange:(from:'${(new Date()).toISOString()}',to:now),
                vis:(params:(sort:(columnIndex:1,direction:asc)))),
                gridData:(h:15,i:f033f1da-c374-41e3-9bb0-d175e9659fb7,w:24,x:0,y:32),
                id:e2257200-99fa-11ea-9ddb-05a3689f3e14,
                panelIndex:f033f1da-c374-41e3-9bb0-d175e9659fb7,
                type:visualization,version:'7.6.1'
              ),
              (
                embeddableConfig:(
                  timeRange:(from:'${from.toISOString()}',to:'${to.toISOString()}')),
                gridData:(h:15,i:a9c70f44-7bc8-4120-80f6-261471eea898,w:24,x:24,y:32),
                id:e2257200-99fa-11ea-9ddb-05a3689f3e14,
                panelIndex:a9c70f44-7bc8-4120-80f6-261471eea898,
                type:visualization,version:'7.6.1'
              )`

// for form 

const form = `
              (
                embeddableConfig:(),
                gridData:(h:30,i:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,w:48,x:0,y:100),
                id:a6c58a10-6534-11ea-b305-a30961cbafb1,
                panelIndex:fab4648a-9bff-45f7-93ee-2bd7c9e6f770,
                type:search,
                version:'7.6.1'
              )`;


const path = (base: string, partUrl: string) =>
  `${base} + 
    /app/kibana# / dashboard / 6535acb0 - 9919 - 11ea - 9ddb - 05a3689f3e14 ? 
      embed = true & 
      _g=(
        refreshInterval: (pause: !f, value: 3000), 
        time: (from: '${(new Date()).toISOString()}', to: now)
      )&
      _a=(
        description: '', 
        filters: !(), 
        fullScreenMode: !f, 
        options: (hidePanelTitles: !f, useMargins: !t), 
        panels: !(${partUrl}), 
        query: (
          language: kuery, 
          query: 'AppName:%20${this.application ? this.application : "*"}%20and%20fields.env%20:%20${this.env ? this.env : "*"}'
      ), 
      timeRestore: !f, 
      title: 'Captor%20Log%20Dashboard%20-%20Bar%20Modified', 
      viewMode: view
    `;