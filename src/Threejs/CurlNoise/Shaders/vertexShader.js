export const vertexShader = `
    varying vec3 vUv;
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec3 v_worldPosition;

    void main(){
        vUv.xy = uv;
        vPos = position;
        vNormal = normal;
        
        v_worldPosition = (modelMatrix * vec4(position,1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
`;
