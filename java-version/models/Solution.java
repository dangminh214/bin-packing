import java.util.ArrayList;
import java.util.List;

public abstract class Solution<C> {

    float runtime;
    List<C> containers;

    public Solution() {
        this.runtime = 0.0f;
        this.containers = new ArrayList<C>();
    }

    public void setRuntime(float runtime) {
        this.runtime = runtime;
    }

    public float getRuntime() {
        return this.runtime;
    }
}
