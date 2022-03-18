import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="samurai" updateStatus={() => {}}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("samurai");
    });

    test("After creation span should be displayed", () => {
        const component = create(<ProfileStatus status="samurai" updateStatus={() => {}}/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test("After creation span should contains correct status", () => {
        const component = create(<ProfileStatus status="samurai" updateStatus={() => {}}/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("samurai");
    });

    test("Callback should be called", () => {
        const mockCallBack = jest.fn(); // пишем фейковую функцию, которая умеет считать, сколько раз её вызвали, для того чтобы тестовая среда узнала, вызвали ли колбэк
        const component = create(<ProfileStatus status="samurai" updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
        
    });
});