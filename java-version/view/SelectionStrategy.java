import java.util.ArrayList;

public interface SelectionStrategy<I> {
    /**
     * Sorts or selects the order in which items should be placed.
     * @param items unsorted items
     */
    public ArrayList<I> orderItems(ArrayList<I> items);

    // getNextItem(): I;
}
