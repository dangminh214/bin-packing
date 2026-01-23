public interface PlacementStrategy<I, S> {
    boolean checkThenAdd(I item, S solution);
}
