export const fragmentShader = `
    varying vec3 vUv;
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec3 v_worldPosition;

    uniform float time;
    uniform vec3 mPos;
    uniform vec3 color;

    float getScatter(vec3 cameraPos, vec3 dir, vec3 lightPos, float d ) {
        vec3 q = cameraPos - lightPos;
        float b = dot(dir,q);
        float c = dot(q,q);
        float t = c- b*b;
        float s = 1.0/sqrt(max(0.0001,t));
        float l = s * (atan((d+b) * s)-atan(b*s));

        return pow(max(0.0,l/10.0),0.8);
    }

    void main(){
        float dash = sin(vUv.x * 50.0 + time );

        vec3 cameraToWorld = v_worldPosition - cameraPosition;
        vec3 cameraToWorldDir = normalize(cameraToWorld);
        float cameraToWorldDistance = length(cameraToWorld);

        vec3 lightToWorld = normalize(mPos - v_worldPosition);
        float diffusion = max(0.0,dot(vNormal,lightToWorld));
        float dist = length(mPos - vPos);

        float scatter = getScatter(cameraPosition,cameraToWorldDir,mPos,cameraToWorldDistance);
        float final = scatter + (diffusion * 0.01);
        
        // if(dash < 0.3) discard;
        vec3 newColor = mix(vec3(0.0,0.0,0.0),color,final);

        // gl_FragColor = vec4(1.0 - dist,0.0,0.0,1.0);
        // gl_FragColor = vec4(final,0.0,0.0,1.0);
        gl_FragColor = vec4(newColor ,1.0);
        // gl_FragColor = final;
    }
`;
