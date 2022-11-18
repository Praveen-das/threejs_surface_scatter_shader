export const vertexShader = `
    #include <normal_pars_vertex>

    uniform float progress;

    varying vec2 vUv;
    varying vec3 vViewPosition;
    
    attribute float randomness;
    attribute vec3 center;

    mat4 rotationMatrix(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;
        
        return mat4(oc * axis.x * axis.x + c,oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                    0.0,                                0.0,                                0.0,                                1.0);
    }
    
    vec3 rotate(vec3 v, vec3 axis, float angle) {
        mat4 m = rotationMatrix(axis, angle);
        return (m * vec4(v, 1.0)).xyz;
    }

    void main(){
        #include <beginnormal_vertex>
        #include <morphnormal_vertex>
        #include <skinnormal_vertex>
        #include <defaultnormal_vertex>
        #include <normal_vertex>

        vec3 pos = position;
        float prog = (position.x + 4.5)/5.0 ;
        float locProg = clamp((progress - 0.2 * prog) * 1.6, 0.0, 1.0);

        pos += 2.0 * (1.0 - locProg);
        pos = (pos - center) * pow(locProg,2.) + center;
        pos = rotate(pos,vec3(1.0,1.0,0.0), randomness * (1.0 - locProg) * 3.14 * 3.0);
        pos = rotate(pos,vec3(0.0,1.0,0.0), randomness * (1.0 - locProg) * 3.14);

        vec4 mvPosition = modelMatrix * viewMatrix * vec4(pos,1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        vUv = uv;
        vViewPosition = -mvPosition.xyz;
    }
`;
